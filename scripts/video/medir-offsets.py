# Rastrea "Obra Test Staging —" frame por frame sobre el intermedio CFR y
# escribe la tabla de tramos que consume encode-hormigon.sh.
#
# La plantilla NO se elige a mano: se toma del primer frame, donde el globo
# esta quieto, y se busca en cada frame a toda altura. Asi el scroll del chat
# no hay que modelarlo, solo medirlo.
import glob, os, sys
from PIL import Image

DIR = sys.argv[1] if len(sys.argv) > 1 else '/tmp/base25'
SALIDA = sys.argv[2] if len(sys.argv) > 2 else '/tmp/horm-offsets.txt'
UMBRAL = 0.75                       # debajo de esto es ruido: el piso medido es 0.63

frames = sorted(glob.glob(f'{DIR}/f*.png'))
base = Image.open(frames[0]).convert('L')
pl = base.crop((134, 124, 380, 150))       # "Obra Test Staging —" en el frame 0
tw, th = pl.size
tp = pl.load()
tinta = [(x, y) for y in range(th) for x in range(tw) if tp[x, y] < 150]
fondo = [(x, y) for y in range(th) for x in range(tw) if tp[x, y] > 230]

pos = {}
for f in frames:
    n = int(os.path.basename(f)[1:-4])
    px = Image.open(f).convert('L').load()
    mejor = (0.0, None)
    for y0 in range(0, 960 - th):
        a = sum(1 for x, y in tinta if px[134 + x, y0 + y] < 160)
        if a < len(tinta) * 0.55:
            continue
        b = sum(1 for x, y in fondo if px[134 + x, y0 + y] > 210)
        p = (a / len(tinta) + b / len(fondo)) / 2
        if p > mejor[0]:
            mejor = (p, y0)
    if mejor[0] >= UMBRAL:
        pos[n] = mejor[1]

# El globo verde con "Obr-test-001" vive 72px arriba de T; solo esta en cuadro
# cuando ahi hay verde de verdad. Se comprueba, no se supone.
def hay_verde(n, T):
    px = Image.open(f'{DIR}/f{n:04d}.png').convert('RGB').load()
    # El texto "Obr-test-001" cae siempre en T-65..T-42 (medido en los cuatro
    # frames donde el globo esta en cuadro). Se mira la franja lisa de abajo,
    # porque la de arriba a veces la tapa el parche del header.
    total = verdes = 0
    for y in range(T - 40, T - 36):
        for x in range(230, 370):
            r, g, b = px[x, y]
            total += 1
            if g > r + 6 and g > b + 20 and g > 180:
                verdes += 1
    return verdes > total * 0.8

tramos = []
for n in sorted(pos):
    T, v = pos[n], hay_verde(n, pos[n])
    if tramos and tramos[-1][1] == n - 1 and tramos[-1][2] == T and tramos[-1][3] == v:
        tramos[-1][1] = n
    else:
        tramos.append([n, n, T, v])

with open(SALIDA, 'w') as fh:
    fh.write('# n0 n1 T verde   (generado por medir-offsets.py)\n')
    for n0, n1, T, v in tramos:
        fh.write(f'{n0} {n1} {T} {1 if v else 0}\n')
print(open(SALIDA).read())
