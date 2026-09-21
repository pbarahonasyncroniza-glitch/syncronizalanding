# Barrido del clip entero buscando restos de "Obra Test Staging".
# Dos etapas porque a fuerza bruta en Python son ~570M comparaciones:
#   1) descarta los frames donde el chat no esta en pantalla (camara, teclado).
#      Si no hay fondo beige de WhatsApp, el globo no puede estar.
#   2) sobre los que quedan, busca la plantilla a toda altura.
import glob, os, sys
from PIL import Image

DIR = sys.argv[1]
REF = sys.argv[2] if len(sys.argv) > 2 else '/tmp/base25/f0000.png'

pl = Image.open(REF).convert('L').crop((134, 124, 380, 150))
tw, th = pl.size
tp = pl.load()
tinta = [(x, y) for y in range(th) for x in range(tw) if tp[x, y] < 150]
fondo = [(x, y) for y in range(th) for x in range(tw) if tp[x, y] > 230]

def chat_visible(px):
    # el empapelado de WhatsApp es beige claro; la camara es negra y el teclado gris
    beige = 0
    for y in range(120, 620, 20):
        for x in range(4, 30, 5):
            r, g, b = px[x, y]
            if r > 225 and g > 215 and b > 205 and r >= b:
                beige += 1
    return beige >= 10

peor = (0.0, None, None)
mirados = 0
for f in sorted(glob.glob(f'{DIR}/f*.png')):
    n = int(os.path.basename(f)[1:-4])
    im = Image.open(f)
    if not chat_visible(im.convert('RGB').load()):
        continue
    mirados += 1
    px = im.convert('L').load()
    for y0 in range(0, 960 - th):
        a = sum(1 for x, y in tinta if px[134 + x, y0 + y] < 160)
        if a < len(tinta) * 0.60:
            continue
        b = sum(1 for x, y in fondo if px[134 + x, y0 + y] > 210)
        p = (a / len(tinta) + b / len(fondo)) / 2
        if p > peor[0]:
            peor = (p, n, y0)
        if p >= 0.75:
            print('QUEDA TEXTO n=', n, 'y=', y0, round(p, 3), flush=True)
print(f'frames con chat a la vista: {mirados}   mejor residual: {peor}')
