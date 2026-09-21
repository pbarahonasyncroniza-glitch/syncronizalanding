import { useState, useEffect } from 'react';
import {
  MessageCircle, Box, Calendar, Truck, Smartphone,
  Check, ArrowRight, Menu, X, Gauge, AlertTriangle,
  ChevronRight, Sparkles
} from 'lucide-react';
import { Reveal, RevealText, Counter } from './motion';
import { useParallax, useRingProgress } from './motion-hooks';

export default function SyncronizaLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // El formulario no postea a ningún lado: arma el mensaje y abre el canal que
  // el visitante elija. Sin backend, sin servicio de formularios de por medio, y
  // sobre todo sin el paso que hace que la gente no escriba — quedarse mirando
  // un WhatsApp en blanco pensando cómo presentarse.
  const [form, setForm] = useState({ nombre: '', empresa: '', obra: '', mensaje: '' });
  const campo = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const listo = form.nombre.trim() !== '' && form.empresa.trim() !== '';

  const cuerpoMensaje = () => {
    const lineas = [
      `Hola, soy ${form.nombre.trim()} de ${form.empresa.trim()}.`,
      form.obra.trim() && `Obra: ${form.obra.trim()}.`,
      'Quiero ver una demo de Syncroniza.',
      form.mensaje.trim() && `\n${form.mensaje.trim()}`,
    ];
    return lineas.filter(Boolean).join('\n');
  };

  const irAWhatsapp = (e) => {
    e.preventDefault();
    if (!listo) return;
    window.open(
      `https://wa.me/56975114550?text=${encodeURIComponent(cuerpoMensaje())}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const irAMail = (e) => {
    e.preventDefault();
    if (!listo) return;
    const asunto = `Demo Syncroniza — ${form.empresa.trim()}`;
    window.location.href =
      `mailto:contacto@syncroniza.cl?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpoMensaje())}`;
  };

  // El fondo del hero se mueve más lento que el contenido: dos capas a distinta
  // velocidad es lo que produce la sensación de profundidad.
  const heroFondo = useParallax();
  const heroMockup = useParallax();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  // El nav se pone sólido al hacer scroll y también con el menú móvil abierto,
  // porque ahí el panel blanco necesita una barra blanca arriba.
  const navSolid = scrolled || navOpen;

  const navLinks = [
    { id: 'suite', label: 'Suite' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'bim4d', label: '4D' },
    { id: 'hormigon', label: 'Hormigón' },
    { id: 'salud', label: 'Salud de obra' },
  ];

  return (
    <div className="min-h-screen bg-white text-ink font-ui antialiased">
      {/* ============ NAV ============ */}
      {/* Arriba el nav flota sobre el hero oscuro, así que el texto va claro;
          al hacer scroll se vuelve barra blanca y el texto se oscurece. */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navSolid ? 'bg-white/95 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5">
            <img
              src="/syncroniza-isotipo.png"
              alt="Syncroniza"
              className="h-7 w-auto"
              width="16"
              height="28"
            />
            <span className={`font-display font-bold tracking-[0.18em] text-sm transition-colors ${
              navSolid ? 'text-ink' : 'text-white'
            }`}>
              SYNCRONIZA
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`text-sm transition-colors ${
                  navSolid ? 'text-ink-3 hover:text-brand' : 'text-nav-text hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contacto')}
              className="bg-brand hover:bg-brand-hover active:bg-brand-press text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
            >
              Solicitar demo
            </button>
          </div>

          <button
            className={`md:hidden transition-colors ${navSolid ? 'text-ink' : 'text-white'}`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 text-slate-700">
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contacto')}
                className="bg-brand text-white py-3 rounded-sm font-medium mt-2"
              >
                Solicitar demo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      {/* El pb bajó de 24/32 a 20/24: los clientes salieron de acá y se fueron a
          su propia banda, que es la que ahora ocupa el tramo entre el hero y la
          suite. Antes ese tramo eran 256px de nada en pantalla grande. */}
      <section id="hero" className="bg-nav-bg text-white pt-32 pb-20 lg:pt-40 lg:pb-24 relative overflow-hidden">
        {/* Los halos son las tres caras del isotipo, difuminadas.
            --p lo escribe useParallax en el contenedor y los hijos lo heredan;
            el -0.5 centra el recorrido para que al cargar estén en su sitio. */}
        <div ref={heroFondo} className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 -right-32 w-96 h-96 bg-iso-sky rounded-full blur-3xl opacity-20"
            style={{ transform: 'translate3d(0, calc((var(--p, 0.5) - 0.5) * 140px), 0)' }}
          />
          <div
            className="absolute bottom-0 -left-32 w-96 h-96 bg-iso-navy rounded-full blur-3xl opacity-40"
            style={{ transform: 'translate3d(0, calc((var(--p, 0.5) - 0.5) * -100px), 0)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal as="div" y={0} x={-16} className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-0.5 bg-iso-sky" />
                <span className="text-iso-sky text-xs font-medium tracking-widest">
                  PLATAFORMA DE CONTROL DE PROYECTOS
                </span>
              </Reveal>

              {/* El titular entra palabra por palabra: es lo primero que se lee,
                  y el escalonado obliga al ojo a recorrerlo en vez de saltarlo. */}
              <RevealText
                as="h1"
                text="Programar, controlar y reportar la obra desde un solo lugar."
                delay={120}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
              />

              <Reveal as="p" delay={460} className="text-lg text-nav-hi/80 mb-10 max-w-2xl leading-relaxed">
                BIM 4D, Last Planner, control por WhatsApp y app móvil de salud de obra —
                trabajando sobre la misma base de datos en tiempo real.
              </Reveal>

              <Reveal delay={560} className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo('contacto')}
                  className="group bg-brand hover:bg-brand-hover active:bg-brand-press shadow-glow hover:shadow-lg text-white px-6 py-3.5 rounded-sm font-medium flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Solicitar demo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('suite')}
                  className="silk-fill border border-white/25 hover:border-iso-sky hover:text-iso-sky text-white px-6 py-3.5 rounded-sm font-medium transition-colors duration-300"
                >
                  Ver la suite
                </button>
              </Reveal>
            </div>

            {/* El mockup flota un poco más rápido que el fondo y más lento que el
                texto: tercera capa de la misma profundidad. */}
            <div ref={heroMockup} className="lg:col-span-5">
              <Reveal delay={320} y={32} blur>
                <div style={{ transform: 'translate3d(0, calc((var(--p, 0.5) - 0.5) * -48px), 0)' }}>
                  <HeroMockup />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRUEBA SOCIAL ============
          Esto antes era una línea de 12px metida a presión en el pie del hero,
          con las tres obras convertidas en texto gris de 14px. Prueba social en
          tamaño de letra chica no es prueba social: es un descargo.

          Va en gris (canvas) entre el hero oscuro y la suite blanca, así el paso
          es oscuro → gris → blanco. Ese escalón es lo que hace que el tramo se
          lea como transición y no como los 256px de nada que había antes.

          NO hay testimonio con nombre y cargo acá a propósito. La frase de la
          derecha es la única afirmación fuerte que se puede sostener hoy: los
          videos de esta página son grabaciones de pantalla del producto
          corriendo en obra, con datos reales — la guía de la sección 03 es la
          misma que se ve en el mockup de WhatsApp. Un testimonio inventado se
          nota, y cuando se nota se lleva puesta la credibilidad del resto. */}
      <section className="bg-canvas border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal as="div" y={0} x={-16} className="text-xs font-medium text-ink-muted tracking-widest">
                EN OBRA HOY
              </Reveal>
              {/* Los dos logos vienen de los avatares de LinkedIn, que llegan en
                  200x200 y con fondos opuestos: Inspira es blanco sobre gris
                  oscuro e Ingevec color sobre blanco. Puestos crudos uno al lado
                  del otro se ven como dos recortes pegados, no como una franja.

                  Van los dos monocromos en ink-3, que es el tratamiento normal de
                  una franja de clientes y además evita que el azul de Ingevec
                  (#006FB7) compita con el azul de marca de Syncroniza. El alfa
                  sale del contraste contra el fondo del avatar, así que el
                  antialiasing del original se conserva y el borde no queda
                  dentado.

                  Las alturas (42 y 46) NO son iguales a propósito: Ingevec es una
                  tipografía gruesa con bajada, Inspira es fina y sin bajada. A la
                  misma altura de caja, Ingevec se come la franja. Estos dos
                  números los dejan pesando igual a la vista. */}
              {/* gap-x-8 en móvil y no 12: los dos logos miden 146 + 152 = 298px
                  y a 390 de viewport quedan 342 útiles. Con 48px de separación
                  se pasan por 4px y se apilan; con 32 entran en una línea. */}
              <div className="flex flex-wrap items-center gap-x-8 sm:gap-x-12 gap-y-6 mt-6">
                <Reveal delay={80} y={14}>
                  <img
                    src="/logo-inspira.png"
                    alt="Inspira"
                    width={438}
                    height={126}
                    className="h-[42px] w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </Reveal>
                <Reveal delay={170} y={14}>
                  <img
                    src="/logo-ingevec.png"
                    alt="Ingevec"
                    width={457}
                    height={138}
                    className="h-[46px] w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </Reveal>
              </div>
            </div>

            {/* El borde izquierdo hace de comilla sin fingir que alguien lo dijo. */}
            <Reveal delay={260} y={16} className="lg:col-span-5 border-l-2 border-brand pl-5">
              <p className="text-ink-2 leading-relaxed">
                Todas las pantallas de esta página son grabaciones del producto
                funcionando en obra, con datos reales.{' '}
                <span className="text-ink-muted">Ninguna es una maqueta.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SUITE ============ */}
      <section id="suite" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="01 — La Suite"
            title="Cinco módulos. Una sola fuente de verdad."
            description="Todo lo que entra por WhatsApp en terreno se ve al instante en la programación 4D, en la curva de hormigón y en los KPIs de gerencia. Sin planillas, sin pasar datos de un sistema a otro."
            datos={[
              { n: 5, label: 'módulos — y se puede partir por uno solo' },
              { n: 1, label: 'sola base de datos: lo que se carga una vez no se vuelve a tipear' },
            ]}
          />
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
      {[
        { icon: MessageCircle, n: '01', name: 'Canal WhatsApp', tag: 'Entrada',       desc: 'Capataces reportan por el canal que ya usan. IA estructura fotos, audios y guías.', link: 'whatsapp' },
        { icon: Box,           n: '02', name: 'Syncroniza 4D', tag: 'BIM + Gantt',   desc: 'Modelo IFC sincronizado con la programación. Recorrido temporal del proyecto.',  link: 'bim4d' },
        { icon: Calendar,      n: '03', name: 'Last Planner',  tag: 'Semanal',       desc: 'Plan semanal, look-ahead, asistencia y reporte automático con QR de proyecto.', link: 'bim4d' },
        { icon: Truck,         n: '04', name: 'Guías Hormigón', tag: 'Real vs plan', desc: 'Cada guía trazada a partida y ciclo. Curva S y desvío en tiempo real.',         link: 'hormigon' },
        { icon: Smartphone,    n: '05', name: 'App Móvil',     tag: 'Salud de obra', desc: 'Health Score, SPI/CPI/PPC y pronóstico EAC en el bolsillo de la gerencia.',     link: 'salud' },
              ].map((m, i) => (
                <Reveal key={i} delay={i * 80} y={28}>
                  <button
                    onClick={() => scrollTo(m.link)}
                    className="group w-full h-full bg-surface2 hover:bg-white hover:border-brand-border hover:shadow-xl hover:-translate-y-1.5 border border-slate-200 rounded-md p-6 transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out relative overflow-hidden text-left cursor-pointer"
                  >
                    {/* La barra queda siempre visible: son los tres azules del
                        isotipo y es lo que identifica la tarjeta. El hover la
                        engrosa, no la estrena. */}
                    <div className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 bg-gradient-to-r from-iso-navy via-iso-mid to-iso-sky transition-all duration-300 ease-out" />
                    <div className="text-xs font-bold text-brand tracking-widest mb-4">{m.n}</div>
                    <div className="w-14 h-14 bg-nav-bg rounded-full flex items-center justify-center mb-5 mx-auto group-hover:scale-110 group-hover:shadow-glow transition-all duration-300 ease-out">
                      <m.icon size={26} className="text-iso-sky" strokeWidth={2} />
                    </div>
                    <h3 className="font-display font-bold text-base text-ink mb-1 text-center">{m.name}</h3>
                    <div className="text-xs uppercase tracking-widest text-brand text-center mb-3">{m.tag}</div>
                    <div className="h-px w-8 group-hover:w-16 bg-brand-border mx-auto mb-3 transition-all duration-500 ease-out" />
                    <p className="text-xs text-ink-3 leading-relaxed text-center mb-4">{m.desc}</p>

                    {/* Indicador de click */}
                    <div className="flex items-center justify-center gap-1 text-xs font-medium text-ink-faint group-hover:text-brand transition-colors duration-300">
                      <span>Ver más</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </Reveal>
              ))}
           </div>   

          <Reveal delay={420} className="mt-10 bg-nav-bg text-white rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <Sparkles size={20} className="text-iso-sky flex-shrink-0" />
            <div>
              <div className="text-xs font-bold tracking-widest text-iso-sky mb-1">UNA SOLA BASE DE DATOS</div>
              <div className="text-nav-text text-sm leading-relaxed">
                Lo que el capataz reporta en WhatsApp se ve al instante en el 4D y en el Health Score de gerencia.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHATSAPP ============ */}
      <section id="whatsapp" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="02 — Canal de terreno"
            title="WhatsApp es el sistema operativo de la obra."
            description="En vez de pelear con apps que nadie usa, Syncroniza convierte los mensajes que ya pasan en datos estructurados: fotos, audios y guías llegan al sistema con su partida, ciclo y nivel."
            datos={[
              { n: 4, label: 'tipos de dato que extrae de un mensaje: fotos, audios, guías y contexto' },
              { n: 0, label: 'aplicaciones que instalar en terreno' },
            ]}
          />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-16 items-start">
            <Reveal className="lg:col-span-5" x={-32} y={0} blur>
              <WhatsAppMockup />
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal as="h3" className="font-display text-xl font-bold text-ink mb-8">
                Lo que Syncroniza extrae automáticamente
              </Reveal>
              <div className="space-y-6">
                {[
                  { t: 'Fotos clasificadas',   d: 'Vision IA detecta tipo de elemento, ubicación y avance estimado.' },
                  { t: 'Audios transcritos',   d: 'Whisper convierte instrucciones y reportes en texto buscable.' },
                  { t: 'Guías de hormigón',    d: 'Lectura OCR de m³, proveedor, hora de llegada y elemento vaciado.' },
                  { t: 'Contexto persistente', d: 'El agente recuerda el proyecto, partidas activas y participantes.' },
                ].map((f, i) => (
                  <Reveal key={i} delay={120 + i * 90} x={20} y={12} className="group flex gap-4">
                    <div className="w-8 h-8 bg-brand-soft border border-brand-border rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
                      <Check size={16} className="text-brand-ink group-hover:text-white transition-colors duration-300" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="font-bold text-ink mb-1">{f.t}</div>
                      <div className="text-ink-3 text-sm leading-relaxed">{f.d}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BIM 4D ============ */}
      <section id="bim4d" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="03 — Syncroniza 4D"
            title="Programación semanal en directo sobre el modelo BIM."
            datos={[
              { n: 2, label: 'archivos para partir: el IFC del modelo y el XML de MS Project' },
            ]}
          />

          {/* Acá el mockup NO va al costado del texto, como en las otras
              secciones. Es un dashboard de 2.7:1 lleno de tipografía chica: en
              una columna de 7/12 quedaba a 671px sobre un viewport de 1440 (47%)
              y no se leía nada. A ancho completo son ~1200px, casi el doble.
              De paso rompe el ritmo título-izquierda / mockup-derecha que ya
              venían repitiendo las secciones 02 y 03 seguidas. */}
          <Reveal as="p" className="text-slate-600 mt-6 max-w-3xl leading-relaxed">
            Suba un IFC y un XML de MS Project. Syncroniza 4D mapea elementos con partidas,
            agrupa por ciclos y le permite recorrer el proyecto en el tiempo — antes y después
            de iniciar la obra.
          </Reveal>

          {/* El -mx-6 lo saca del padding del contenedor: en móvil gana esos
              48px, que sobre 390 es un 14% más de ancho útil. */}
          <Reveal className="mt-12 -mx-6 sm:mx-0" delay={160} y={28} blur>
            <BIM4DMockup />
            <div className="text-center text-xs text-slate-500 mt-3 italic">
              Vista de Planificación Semanal
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Visualización 4D por ciclo, semana y partida',
              'Mapeo WBS ↔ IFC asistido por IA',
              'Curva S de hormigón con cubicación automática',
              'Modo avance real: lo ejecutado se pinta en gris',
              'Last Planner 3D: asignación diaria sobre el modelo',
            ].map((t, i) => (
              <Reveal as="li" key={i} delay={140 + i * 70} x={16} y={10} className="flex items-start gap-3">
                <Check size={18} className="text-brand mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span className="text-ink-2">{t}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ HORMIGÓN ============ */}
      <section id="hormigon" className="py-24 lg:py-32 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="04 — Control de hormigón"
            title="Cero sobrecostos en hormigón."
            description="Una foto al WhatsApp del bot. La IA lee proveedor, m³ y elemento, y los cruza con lo programado. Detecta sobrestadía, devoluciones y diferencias entre despachado y colocado antes de que se conviertan en plata perdida."
          />

          {/* El flujo real, grabado del celular del capataz. Va en el mismo chasis
              que el dashboard: es una grabación vertical y el marco de ventana Mac
              que tenía antes la dejaba con 68% de barra negra a los costados.
              Los 3 pasos van AL LADO y no debajo: un teléfono de 286px centrado en
              una grilla de 1280 deja medio ancho de página en blanco.

              El mp4 sale del master con `crop=608:1080:656:0` — alto COMPLETO, 9:16
              exacto. Recortar filas de arriba para matar la barra roja de grabación
              de iOS es la trampa: esa barra solo existe en las pantallas de chat
              (51 de 86 frames medidos), y en las de foto a pantalla completa esas
              mismas filas son la guía de despacho. Se tapa con drawbox y `enable`,
              no se recorta. */}
          <div className="mt-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5" y={32} blur>
              <PhoneFrame chromeIOS={false}>
                {/* width/height + aspect-[] no sobran por estar ya en el archivo:
                    con `preload="none"` el navegador no pide la metadata, así que
                    hasta que pinta el poster el <video> mide su default intrínseco
                    de 300x150 — apaisado — y el teléfono se ve chato. Declarando la
                    proporción, la caja es la correcta desde el primer frame. */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/hormigon-poster.jpg"
                  width={540}
                  height={960}
                  className="block aspect-[540/960] w-full object-cover"
                >
                  <source src="/hormigon-demo.mp4" type="video/mp4" />
                </video>
              </PhoneFrame>
            </Reveal>

            <div className="lg:col-span-7 space-y-8">
              {[
                { num: '01', title: 'Captura', desc: 'El capataz envía la foto de la guía por WhatsApp. Sin app, sin formularios.' },
                { num: '02', title: 'Procesa', desc: 'El agente IA lee proveedor, m³, hora, elemento y ciclo en segundos.' },
                { num: '03', title: 'Controla', desc: 'La guía queda trazada en el dashboard, con alerta si hay desvío.' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 110} x={16} className="group flex gap-5">
                  <div className="font-display text-3xl font-bold text-brand flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ease-out">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink mb-1">{s.title}</h3>
                    <p className="text-sm text-ink-3 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* KPIs — la cifra sube desde cero al entrar en pantalla.
              Un número escrito no se lee; un número que sube, sí. */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { v: 100, pre: '',  suf: '%', l: 'de guías trazadas a partida y ciclo', c: 'text-white' },
              { v: 12,  pre: '−', suf: '%', l: 'promedio en sobrecostos de hormigón', c: 'text-emerald-400' },
              { v: 30,  pre: '<', suf: 's', l: 'para procesar y validar cada guía',   c: 'text-iso-sky' },
            ].map((k, i) => (
              <Reveal key={i} delay={i * 110} className="silk-lift bg-nav-bg hover:bg-nav-elev rounded-md p-6 flex items-center gap-5">
                <Counter
                  value={k.v}
                  prefix={k.pre}
                  suffix={k.suf}
                  duration={1400 + i * 150}
                  className={`font-display text-4xl font-bold tabular-nums ${k.c}`}
                />
                <div className="text-sm text-nav-text leading-snug">{k.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SALUD DE OBRA ============ */}
      <section id="salud" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="05 — Salud de Obra · App móvil"
            title="La obra en una sola pantalla."
            description="Sintetiza plazo, costo, productividad y compromisos en un Health Score único. La gerencia ve el estado real del proyecto sin abrir el computador, y recibe alertas antes de que los problemas se vuelvan caros."
            datos={[
              { n: 4, label: 'indicadores estándar: SPI, CPI, IPI y PPC' },
              { n: 1, label: 'Health Score que los resume en un número' },
            ]}
          />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-16 items-start">
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { letter: 'SPI', title: 'Plazo',         desc: '¿Vamos en tiempo? Schedule Performance Index calculado a diario por valor ganado.' },
                  { letter: 'CPI', title: 'Costo',         desc: '¿Cada peso rinde? Cost Performance Index con la data real de avance y horas.' },
                  { letter: 'IPI', title: 'Productividad', desc: '¿Cuánto producimos por día? m³, m² o unidades reales vs lo planificado.' },
                  { letter: 'PPC', title: 'Compromisos',   desc: '¿Se cumple lo prometido? Porcentaje de Plan Cumplido del Last Planner semanal.' },
                ].map((d, i) => (
                  <Reveal
                    key={i}
                    delay={i * 90}
                    className="silk-lift group bg-surface2 hover:bg-white hover:shadow-lg border border-slate-200 rounded-md p-6 border-l-4 border-l-brand hover:border-l-iso-sky"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-nav-bg text-white text-xs font-bold tracking-wider px-3 py-1.5 rounded group-hover:bg-brand transition-colors duration-300">
                        {d.letter}
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink">{d.title}</h3>
                    </div>
                    <p className="text-sm text-ink-3 leading-relaxed">{d.desc}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={380} className="mt-6 bg-nav-bg rounded-md p-5 flex items-center gap-4">
                <Gauge size={22} className="text-iso-sky flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-iso-sky mb-1">
                    HEALTH SCORE · 0–100
                  </div>
                  <div className="text-sm text-nav-text">
                    Las cuatro dimensiones se ponderan en una sola métrica de salud.
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-4 flex justify-center" delay={200} x={24} y={20} blur>
              <PhoneMockup />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHY / REASONS ============ */}
      <section className="py-24 lg:py-32 bg-nav-bg text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal as="div" y={0} x={-16} className="text-iso-sky text-xs font-medium tracking-widest mb-4">
              06 — POR QUÉ SYNCRONIZA
            </Reveal>
            <RevealText
              as="h2"
              text="Una plataforma. Toda la obra."
              delay={120}
              className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6"
            />
            <Reveal as="p" delay={320} className="text-nav-text text-lg leading-relaxed">
              Syncroniza no reemplaza al jefe de terreno. Le devuelve las horas que pierde haciendo planillas.
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-16">
            {[
              { n: '01', t: 'Hecho en Chile, para la obra chilena', d: 'Pensado sobre Last Planner, MS Project y los flujos reales de constructoras locales.' },
              { n: '02', t: 'Implementación en días, no en meses',  d: 'El equipo sigue usando WhatsApp en obra. La oficina ve los datos al instante.' },
              { n: '03', t: 'Suite integrada y modular',            d: 'Empiece por un módulo (Last Planner, Guías, 4D) y crezca al ritmo del proyecto.' },
            ].map((r, i) => (
              <Reveal
                key={i}
                delay={i * 110}
                className="silk-lift group relative overflow-hidden bg-nav-elev hover:border-iso-sky/50 border border-nav-border2 rounded-md p-7"
              >
                {/* Filo que se dibuja al pasar el mouse, igual que las tarjetas
                    de la suite: el mismo gesto repetido en toda la página. */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-iso-navy via-iso-mid to-iso-sky origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <div className="text-iso-sky text-xs font-bold tracking-widest mb-4">{r.n}</div>
                <h3 className="font-display text-lg font-bold mb-3 leading-snug">{r.t}</h3>
                <p className="text-nav-text text-sm leading-relaxed">{r.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section
        id="contacto"
        className="py-24 text-white bg-gradient-to-br from-iso-navy via-brand-press to-iso-mid"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <RevealText
              as="h2"
              text="¿Vemos cómo se aplica a tu obra?"
              className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6"
            />
            <Reveal as="p" delay={280} className="text-brand-soft text-lg mb-8">
              Una demo de 30 minutos con un caso real. Te mostramos cómo conectamos tu programa
              actual, tu BIM y tu WhatsApp.
            </Reveal>
            <Reveal delay={360} className="space-y-3 text-brand-soft text-sm">
              {[
                'No hay que botar MS Project ni Primavera: se importa el programa que ya tienes.',
                'El piloto parte en una obra, no en toda la constructora.',
                'El capataz no instala nada: usa el WhatsApp que ya tiene.',
              ].map((t) => (
                <div key={t} className="flex gap-2.5">
                  <Check size={17} className="shrink-0 mt-0.5 text-white/70" />
                  <span>{t}</span>
                </div>
              ))}
            </Reveal>
          </div>

          {/* El botón dice exactamente lo que hace. Un "Enviar" que en realidad
              abre WhatsApp rompe la expectativa justo en el momento de confiar. */}
          <Reveal delay={200}>
            <form
              onSubmit={irAWhatsapp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 lg:p-8 text-left"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Campo
                  id="cta-nombre"
                  label="Nombre"
                  autoComplete="name"
                  value={form.nombre}
                  onChange={campo('nombre')}
                />
                <Campo
                  id="cta-empresa"
                  label="Empresa"
                  autoComplete="organization"
                  value={form.empresa}
                  onChange={campo('empresa')}
                />
              </div>
              <div className="mb-4">
                <Campo
                  id="cta-obra"
                  label="Obra"
                  opcional
                  value={form.obra}
                  onChange={campo('obra')}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="cta-mensaje"
                  className="block text-xs uppercase tracking-wider text-brand-soft/80 mb-1.5"
                >
                  Qué quieres resolver <span className="normal-case tracking-normal opacity-60">(opcional)</span>
                </label>
                <textarea
                  id="cta-mensaje"
                  rows={3}
                  value={form.mensaje}
                  onChange={campo('mensaje')}
                  placeholder="Ej: no sé cuánto hormigón llegó realmente a la obra esta semana."
                  className="w-full bg-white/10 border border-white/25 rounded-sm px-3.5 py-2.5 text-white placeholder:text-white/40 text-base sm:text-sm resize-none focus:outline-none focus:border-white/70 focus:bg-white/15 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={!listo}
                className="group w-full bg-white hover:bg-brand-soft disabled:bg-white/25 disabled:text-white/50 disabled:cursor-not-allowed text-brand-press px-6 py-3.5 rounded-sm font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 enabled:hover:shadow-lg enabled:hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Abrir WhatsApp con el mensaje listo
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-enabled:group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-brand-soft/80 text-sm mt-4">
                ¿Prefieres mail?{' '}
                <button
                  type="button"
                  onClick={irAMail}
                  disabled={!listo}
                  className="underline underline-offset-2 hover:text-white disabled:no-underline disabled:cursor-not-allowed transition-colors duration-200"
                >
                  contacto@syncroniza.cl
                </button>
              </p>
              <p className="text-center text-white/40 text-xs mt-2">
                {listo
                  ? 'Se abre con tus datos ya escritos. Tú aprietas enviar.'
                  : 'Completa nombre y empresa para continuar.'}
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-nav-bg text-nav-text py-12 border-t border-nav-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/syncroniza-isotipo.png"
                  alt="Syncroniza"
                  className="h-7 w-auto"
                  width="16"
                  height="28"
                />
                <span className="font-display font-bold tracking-[0.18em] text-sm text-white">SYNCRONIZA</span>
              </div>
              <p className="text-sm text-nav-faint leading-relaxed">
                Plataforma chilena de control de proyectos de construcción.
              </p>
            </div>

            <div>
              <div className="text-white font-medium mb-3 text-sm">Plataforma</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo('suite')} className="hover:text-white">Suite</button></li>
                <li><button onClick={() => scrollTo('bim4d')} className="hover:text-white">Syncroniza 4D</button></li>
                <li><button onClick={() => scrollTo('salud')} className="hover:text-white">Salud de Obra</button></li>
              </ul>
            </div>

            {/* Acá había "Sobre nosotros", "Casos de éxito" y "Blog", los tres
                con href="#". Un link que no lleva a ninguna parte es peor que no
                tenerlo: el visitante hace clic, no pasa nada, y lo que aprende es
                que el sitio está a medio hacer. Quedan solo anclas que existen;
                cuando haya páginas reales, vuelven. */}
            <div>
              <div className="text-white font-medium mb-3 text-sm">Producto</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo('whatsapp')} className="hover:text-white">Bot de WhatsApp</button></li>
                <li><button onClick={() => scrollTo('hormigon')} className="hover:text-white">Control de hormigón</button></li>
                <li><button onClick={() => scrollTo('contacto')} className="hover:text-white">Solicitar demo</button></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3 text-sm">Contacto</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:contacto@syncroniza.cl" className="hover:text-white">
                    contacto@syncroniza.cl
                  </a>
                </li>
                <li>Santiago, Chile</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-nav-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-nav-faint">
            <div>© 2026 Syncroniza · Todos los derechos reservados</div>
            {/* "Términos" y "Privacidad" también apuntaban a "#". Son links que
                además comprometen legalmente: mejor ausentes que rotos. Van
                cuando existan los documentos. */}
            <a href="mailto:contacto@syncroniza.cl" className="hover:text-white">
              contacto@syncroniza.cl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============== SUB-COMPONENTS ==============

// Input del formulario de contacto. La etiqueta va arriba y siempre visible, no
// de placeholder: sobre el fondo oscuro un placeholder legible compite con el
// texto escrito, y además desaparece justo cuando el visitante quiere revisar
// que puso los datos donde correspondía.
function Campo({ id, label, value, onChange, opcional = false, autoComplete = 'off' }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-wider text-brand-soft/80 mb-1.5"
      >
        {label}{' '}
        {opcional && <span className="normal-case tracking-normal opacity-60">(opcional)</span>}
      </label>
      {/* El `text-base` en móvil no es estético: iOS Safari hace zoom solo al
          enfocar un input con fuente menor a 16px, y deja la página corrida. */}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full bg-white/10 border border-white/25 rounded-sm px-3.5 py-2.5 text-white placeholder:text-white/40 text-base sm:text-sm focus:outline-none focus:border-white/70 focus:bg-white/15 transition-colors duration-200"
      />
    </div>
  );
}

// Todas las secciones entran igual — esa repetición es justamente lo que se
// lee como "prolijo". El retardo de la bajada se calcula sobre las palabras
// del título para que arranque cuando la última termina de subir.
function SectionHeader({ eyebrow, title, description, datos }) {
  const retardoBajada = 120 + title.split(' ').length * 40;

  const texto = (
    <>
      <Reveal as="div" y={0} x={-16} className="text-brand text-xs font-medium tracking-widest mb-4">
        {eyebrow}
      </Reveal>
      <RevealText
        as="h2"
        text={title}
        delay={120}
        className="font-display text-3xl lg:text-5xl font-bold leading-tight text-ink mb-6"
      />
      {description && (
        <Reveal as="p" delay={retardoBajada} className="text-ink-3 text-lg leading-relaxed">
          {description}
        </Reveal>
      )}
    </>
  );

  // Sin datos el título se queda como estaba. La sección de hormigón es el caso:
  // cierra con su propia fila de cifras, y repetirlas arriba sería ruido.
  if (!datos) return <div className="max-w-3xl">{texto}</div>;

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
      <div className="lg:col-span-7">{texto}</div>

      {/* El título ocupa media página y la otra media quedaba vacía. Acá van
          datos que se pueden comprobar en la misma sección — no promesas de
          resultado, que sin un cliente que las firme no valen nada. */}
      <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0">
        {datos.map((d, i) => (
          <Reveal
            key={i}
            delay={retardoBajada + 120 + i * 120}
            x={16}
            y={12}
            className="lg:flex lg:items-baseline lg:gap-5 lg:border-t lg:border-slate-200 lg:pt-4 lg:mt-4 lg:first:mt-0 lg:first:border-t-0 lg:first:pt-0"
          >
            <Counter
              value={d.n}
              suffix={d.sufijo || ''}
              className="font-display text-4xl lg:text-5xl font-bold tabular-nums text-brand block lg:inline lg:w-20 lg:shrink-0"
            />
            <span className="text-ink-3 text-sm leading-snug block mt-1 lg:mt-0">{d.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function HeroMockup() {
  // El anillo se dibuja y la cifra sube con el mismo valor, así nunca se
  // desincronizan: el 86 aterriza justo cuando el arco cierra.
  const [ringRef, score] = useRingProgress(86);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-iso-sky rounded-full blur-3xl opacity-30" />
      <div className="relative bg-nav-elev rounded-lg border border-nav-border2 shadow-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-white font-bold text-sm">Edificio Tranquila</div>
            <div className="text-slate-500 text-xs mt-0.5">Semana 32 de 78</div>
          </div>
          <div className="bg-amber-900/30 border border-amber-700/50 text-amber-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <AlertTriangle size={12} /> 2 alertas
          </div>
        </div>

        <div className="flex justify-center my-6">
          <div ref={ringRef} className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="8"
                strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-3xl font-bold tabular-nums">{Math.round(score)}</div>
              <div className="text-slate-500 text-xs">de 100</div>
            </div>
          </div>
        </div>
        <div className="text-center text-xs font-bold text-white tracking-widest">SALUD GENERAL</div>
        <div className="text-center text-xs text-emerald-500 mt-1">● En buen estado</div>

        <div className="grid grid-cols-2 gap-2 mt-5">
          {[
            { v: '0,98', l: 'SPI · PLAZO', c: '#EF4444' },
            { v: '0,94', l: 'CPI · COSTO', c: '#F59E0B' },
            { v: '0,91', l: 'IPI · PROD', c: '#F59E0B' },
            { v: '78%',  l: 'PPC · LP',   c: '#10B981' },
          ].map((m, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: m.c }}>
                <div className="text-[10px] font-bold text-white">{m.v}</div>
              </div>
              <div className="text-[9px] font-bold text-slate-400 tracking-wider">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppMockup() {
  return (
    <div className="relative max-w-sm mx-auto">
      <div className="bg-[#075E54] rounded-t-2xl p-4">
        <div className="text-white font-bold text-sm">Syncroniza </div>
        <div className="text-emerald-100 text-xs mt-0.5">en línea</div>
      </div>
      <div className="bg-[#ECE5DD] p-4 space-y-3 rounded-b-2xl min-h-[380px] shadow-xl">
        {/* Incoming photo */}
        <div className="flex">
          <div className="bg-white rounded-lg p-2.5 max-w-[75%] shadow-sm">
            {/* Acá había un rectángulo gris que decía "📷 Foto guía". El punto
                entero de esta sección es que el capataz manda una foto de papel
                arrugado y el sistema la entiende: un placeholder gris no prueba
                nada.

                El recorte NO sale del frame donde se está sacando la foto, que
                es el más nítido: ese tiene encima la X y el botón de flash de la
                cámara de iOS, y el flash cae justo sobre el número de guía. Sale
                del frame en que la foto ya está enviada (t≈13s), que es papel y
                nada más. Se recorta a 204x168 del original y se guarda a 408 —
                el doble de los ~200px a los que se muestra, para pantallas 2x. */}
            <img
              src="/guia-despacho.jpg"
              alt="Foto de una guía de despacho de hormigón enviada por WhatsApp"
              width={408}
              height={336}
              loading="lazy"
              className="block w-full rounded mb-2"
            />
            <div className="text-xs text-slate-700 leading-tight">
              <div className="font-medium">Guía hormigón</div>
              <div className="text-slate-500">Losa piso 2, ciclo C-03</div>
            </div>
          </div>
        </div>

        {/* Outgoing system reply */}
        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[80%] shadow-sm">
            <div className="text-xs text-slate-800 leading-relaxed">
              <div className="font-bold text-emerald-800">✓ Guía registrada</div>
              {/* Los datos salen de la guía de la foto, no de un ejemplo
                  inventado: antes decía "Nº 0000870036 · Polpaico" al lado de
                  una foto de Santa Laura. Alguien del rubro lo nota, y lo que
                  nota es que el mockup es de mentira. */}
              <div className="mt-1 space-y-0.5">
                <div>Nº 446.482 · Santa Laura</div>
                <div>6,0 m³ · G30</div>
                <div>Losa · P2 · Ciclo C-03</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 text-right mt-1">09:43 ✓✓</div>
          </div>
        </div>

        {/* Audio */}
        <div className="flex">
          <div className="bg-white rounded-lg p-3 max-w-[75%] shadow-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#075E54] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="text-xs text-slate-700">0:24 audio del capataz</div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg px-3 py-1.5 shadow-sm">
            <div className="text-xs text-slate-800">✓ Transcrito y registrado</div>
            <div className="text-[10px] text-slate-500 text-right">09:44 ✓✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BIM4DMockup() {
  return (
    <div className="relative bg-slate-950 border-y border-slate-800 shadow-xl overflow-hidden sm:rounded-xl sm:border-x">
      <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </div>
        <div className="text-slate-400 text-xs ml-2">Syncroniza 4D · Planificación Semanal</div>
      </div>
      {/* `preload="none"` + poster: el video no se baja hasta que alguien llega
          a la sección. Es la diferencia entre cargar la landing y bajar un mp4.
          El costo de eso es que sin metadata el <video> mide 300x150 hasta que
          pinta el poster, así que la proporción va declarada a mano.

          El mp4 sale del master con `crop=1920:708:0:186`, que es lo que dice
          cropdetect. Un crop más bajo parece limpio en un frame suelto pero se
          come el modelo: hay instantes en que la geometría llega hasta la última
          fila. El isotipo naranja (marca vieja) se tapa con dos drawbox del color
          del fondo, no recortando.

          Bajo `sm` la caja pasa a 16:10 y `object-cover` acerca al centro: a
          390px de ancho el frame completo mide 144px de alto y no se lee ni una
          barra del gantt. Recortado son 244px y se ven el modelo y las barras;
          lo que se pierde a los lados es el sidebar y el panel de la derecha,
          que es justamente lo que menos importa en un teléfono. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/bim4d-poster.jpg"
        width={1440}
        height={532}
        className="block aspect-[16/10] w-full object-cover sm:aspect-[1440/532]"
      >
        <source src="/bim4d-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
/* La barra de estado es lo que hace que el bloque se lea como teléfono antes de
   que el ojo procese el contenido. Los íconos van dibujados a mano y no con
   lucide: a 8-10px los trazos de una librería se empastan. */
function BarraEstado() {
  return (
    <div className="relative z-30 flex items-center justify-between px-5 pt-2.5 pb-1 text-white">
      <div className="text-[10px] font-semibold tracking-tight tabular-nums">9:41</div>
      <div className="flex items-center gap-1">
        {/* Señal: cuatro barras crecientes */}
        <div className="flex items-end gap-[1.5px]">
          {[3, 5, 7, 9].map((h) => (
            <div key={h} className="w-[2px] rounded-[1px] bg-white" style={{ height: `${h}px` }} />
          ))}
        </div>
        {/* Wifi */}
        <svg width="11" height="9" viewBox="0 0 16 12" fill="none" className="ml-0.5">
          <path d="M1 4.2a11 11 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.6 7a7 7 0 0 1 8.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="10" r="1.2" fill="currentColor" />
        </svg>
        {/* Batería */}
        <div className="ml-0.5 flex items-center">
          <div className="relative h-[9px] w-[17px] rounded-[3px] border border-white/60 p-[1.5px]">
            <div className="h-full w-[72%] rounded-[1px] bg-white" />
          </div>
          <div className="ml-[1px] h-[3px] w-[1.5px] rounded-r-sm bg-white/60" />
        </div>
      </div>
    </div>
  );
}

/**
 * El chasis, sin contenido. Lo comparten el dashboard de salud y el video de
 * hormigón, que es una grabación de celular: metido en un marco de ventana Mac
 * generaba 68% de barra negra, acá calza exacto.
 *
 * `chromeIOS` apaga isla y barra de estado a la vez. Va apagado cuando adentro
 * corre una grabación de pantalla: la isla le tapa el header de la app y la
 * barra de estado quedaría duplicada. El chasis y los botones ya alcanzan para
 * que se lea como teléfono.
 */
function PhoneFrame({ children, chromeIOS = true, className = '' }) {
  return (
    <div className={`relative mx-auto w-[286px] ${className}`}>
      {/* Botones laterales. El degradado va de claro (afuera, donde pega la luz)
          a oscuro (contra el marco). Al revés se ven como pestañas negras
          pegadas al costado. */}
      <div className="absolute -left-[2px] top-[104px] h-9 w-[2px] rounded-l-full bg-gradient-to-r from-slate-300 to-slate-600" />
      <div className="absolute -left-[2px] top-[152px] h-14 w-[2px] rounded-l-full bg-gradient-to-r from-slate-300 to-slate-600" />
      <div className="absolute -left-[2px] top-[222px] h-14 w-[2px] rounded-l-full bg-gradient-to-r from-slate-300 to-slate-600" />
      <div className="absolute -right-[2px] top-[186px] h-20 w-[2px] rounded-r-full bg-gradient-to-l from-slate-300 to-slate-600" />

      {/* Marco de titanio: el degradado vertical es lo que lee como metal.
          Va `relative` y después de los botones en el DOM: así los tapa a
          medias sin necesidad de z-index negativo (que lo mandaría detrás del
          fondo de la sección). */}
      <div className="relative rounded-[2.9rem] bg-gradient-to-b from-slate-400 via-slate-700 to-slate-400 p-[3px] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.45)]">
        {/* Bisel negro — el salto marco→negro→pantalla es lo que faltaba antes,
            cuando el marco slate-900 se fundía con la pantalla slate-950. */}
        <div className="rounded-[2.75rem] bg-black p-[7px]">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-slate-950">
            {chromeIOS ? (
              <>
                {/* Isla dinámica */}
                <div className="absolute left-1/2 top-2 z-30 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
                  <div className="h-[7px] w-[7px] rounded-full bg-slate-800 ring-1 ring-slate-700/60" />
                </div>
                <BarraEstado />
              </>
            ) : null}
            {children}

            {/* Indicador de home */}
            <div className="absolute bottom-[7px] left-1/2 z-30 h-[4px] w-[108px] -translate-x-1/2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const [ringRef, score] = useRingProgress(86);

  return (
    <PhoneFrame>
      <div className="space-y-3 px-4 pb-7 pt-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-xs">Edificio Tranquila</div>
            <div className="text-slate-500 text-[10px]">Semana 32 de 78</div>
          </div>
          <div className="bg-amber-900/40 border border-amber-700/50 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
            <AlertTriangle size={9} /> 2
          </div>
        </div>

        {/* Anillo principal */}
        <div className="flex justify-center py-2">
          <div ref={ringRef} className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="9" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="9"
                strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-2xl font-bold tabular-nums">{Math.round(score)}</div>
              <div className="text-slate-500 text-[9px]">de 100</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] font-bold text-white tracking-widest">SALUD GENERAL</div>
        <div className="text-center text-[10px] text-emerald-500">● En buen estado</div>

        {/* Anillos chicos */}
        <div className="grid grid-cols-2 gap-1.5 pt-2">
          {[
            { v: '0,98', l: 'SPI · PLAZO', c: '#EF4444' },
            { v: '0,94', l: 'CPI · COSTO', c: '#F59E0B' },
            { v: '0,91', l: 'IPI · PROD',  c: '#F59E0B' },
            { v: '78%',  l: 'PPC · LP',    c: '#10B981' },
          ].map((m, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded p-1.5 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center mb-1" style={{ borderColor: m.c }}>
                <div className="text-[9px] font-bold text-white">{m.v}</div>
              </div>
              <div className="text-[8px] font-bold text-slate-400 tracking-wider">{m.l}</div>
            </div>
          ))}
        </div>

        {/* Pronóstico */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[9px] font-bold text-slate-500 tracking-widest">PRONÓSTICO</div>
            <div className="text-[9px] font-bold text-red-400">+11 DÍAS</div>
          </div>
          <div className="flex items-baseline gap-2">
            <Counter value={11} duration={1100} rootMargin="0px" className="font-display text-2xl font-bold text-red-400 tabular-nums" />
            <div>
              <div className="text-[10px] font-bold text-white">días de atraso</div>
              <div className="text-[8px] text-slate-500">10 abr 2027 · Plan: 30 mar</div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
