#!/usr/bin/env bash
# Reencode del video de hormigon desde el master, en dos pasadas.
#
# Ademas del recorte y del header reemplazado (que ya estaban), tapa el nombre
# de la obra de staging. Ese texto sale en dos tramos del clip:
#   - al abrir, el globo del menu esta arriba de todo
#   - al volver del teclado, el chat se vuelve a pintar
# y dentro de cada tramo el globo esta a una altura distinta en casi cada frame,
# porque el chat viene scrolleando. Por eso hay un grupo de cajas por posicion
# medida, en vez de una caja fija.
#
# Por que DOS pasadas: el master es una grabacion de pantalla de iOS y viene a
# frame rate variable. En una sola pasada, el `n` que ven los filtros cuenta
# frames de ENTRADA, mientras que las posiciones del globo se midieron sobre la
# SALIDA — y las dos secuencias no coinciden (el fps=25 duplica y descarta).
# Las cajas se corrian un frame y tapaban el globo equivocado. Con la pasada 1
# ya en CFR 25 y sin seek, entrada y salida de la pasada 2 son la misma lista.
#
# Se tapa, no se reemplaza: poner "Edificio Tranquila" ahi seria inventar donde
# se grabo. Queda "Hola 👋" + linea en blanco + "Que quieres hacer?", que es una
# forma normal de escribir un menu por WhatsApp.
#
# Los pasos completos, incluido como se genera la tabla de posiciones, estan en
# el README de esta carpeta. El master no esta en el repo: pesa 24 MB.
set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/../.." && pwd)"
MASTER="${MASTER:-/tmp/master/hormigon.mp4}"
BASE=/tmp/horm-base.mkv
SALIDA="${1:-$RAIZ/public/hormigon-demo.mp4}"
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
TABLA="${TABLA:-/tmp/horm-offsets.txt}"

# El header original traia el mismo nombre de staging; ya se reemplazaba antes.
EN_HDR="between(t,0,1.1)+between(t,9.7,21.35)"

# ---- pasada 1: recorte, escala y header. Sin perdida, es un intermedio. -----
if [ ! -f "$BASE" ] || [ "${REHACER_BASE:-}" = "1" ]; then
  ffmpeg -v error -ss 5.5 -to 26.8 -i "$MASTER" \
    -vf "fps=25,crop=608:1080:656:0,scale=540:-2,\
drawbox=x=0:y=0:w=540:h=32:color=0xF8F1ED@1:t=fill:enable='$EN_HDR',\
drawbox=x=80:y=32:w=460:h=59:color=0xF8F1ED@1:t=fill:enable='$EN_HDR',\
drawtext=fontfile=$FONT:text='Syncroniza':fontsize=28:fontcolor=0x141414:x=94:y=49:enable='$EN_HDR'" \
    -an -c:v libx264 -qp 0 -preset ultrafast -pix_fmt yuv444p -y "$BASE"
  echo "base lista: $BASE"
fi

[ -f "$TABLA" ] || { echo "falta la tabla de posiciones $TABLA — generala con medir-offsets.py (ver README)"; exit 1; }

# ---- pasada 2: tapar. La tabla trae una linea "n0 n1 T" por tramo. ----------
# Colores muestreados del render (mediana sobre una zona lisa de cada globo) y
# despues COMPENSADOS: el viaje a yuv420p y de vuelta corre los valores, asi que
# pedir el color medido deja el parche mas apagado que el fondo y se ve el
# rectangulo. Medido: 0xFDFDFD salia 252 (el globo es 253) y 0xDBFCD8 salia
# (215,245,213) contra (217,251,213). Estos dos ya caen dentro de la propia
# variacion del original.
BLANCO="${BLANCO:-0xFEFEFE}"
VERDE="${VERDE:-0xDEFFDA}"

FILTRO=""
while read -r n0 n1 T verde_si; do
  [ -z "${n0:-}" ] && continue
  case "$n0" in \#*) continue;; esac
  EN="between(n,$n0,$n1)"
  # Relativo a T (fila superior de "Obra Test Staging"): la linea 1 ocupa
  # T+2..T+24 y la linea 2 T+33..T+51. La caja de la linea 1 arranca en x=128,
  # o sea despues del emoji: "Hola 👋" se queda.
  FILTRO+="drawbox=x=128:y=$((T-3)):w=252:h=30:color=$BLANCO@1:t=fill:enable='$EN',"
  FILTRO+="drawbox=x=36:y=$((T+28)):w=344:h=30:color=$BLANCO@1:t=fill:enable='$EN',"
  # El globo saliente con el codigo de obra "Obr-test-001", cuando esta en
  # cuadro: su texto cae en T-65..T-42. El tope en 92 no es decorativo — en el
  # frame en que el globo esta pegado arriba, el parche beige del header llega
  # hasta y=91, y sin el tope la caja verde le pintaria un rectangulo encima.
  if [ "${verde_si:-0}" = "1" ]; then
    YV=$(( T-70 > 92 ? T-70 : 92 ))
    FILTRO+="drawbox=x=222:y=$YV:w=160:h=$(( T-37-YV )):color=$VERDE@1:t=fill:enable='$EN',"
  fi
done < "$TABLA"
FILTRO="${FILTRO%,}"

ffmpeg -v error -i "$BASE" -vf "$FILTRO" \
  -an -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -y "$SALIDA"
echo "listo: $SALIDA"
