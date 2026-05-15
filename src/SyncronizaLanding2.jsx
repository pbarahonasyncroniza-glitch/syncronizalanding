import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Box, Calendar, Truck, Smartphone,
  Check, ArrowRight, Menu, X, Brain, BarChart3,
  Clock, DollarSign, Gauge, Handshake, AlertTriangle,
  ChevronRight, Sparkles
} from 'lucide-react';

export default function SyncronizaLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  const navLinks = [
    { id: 'suite', label: 'Suite' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'bim4d', label: '4D' },
    { id: 'hormigon', label: 'Hormigón' },
    { id: 'salud', label: 'Salud de obra' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* ============ NAV ============ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm rotate-45" />
            </div>
            <span className="font-bold tracking-widest text-sm">SYNCRONIZA</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contacto')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Solicitar demo
            </button>
          </div>

          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
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
                className="bg-slate-900 text-white py-3 rounded-md font-medium mt-2"
              >
                Solicitar demo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section id="hero" className="bg-slate-900 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 -right-32 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 -left-32 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-0.5 bg-orange-500" />
                <span className="text-orange-500 text-xs font-medium tracking-widest">
                  PLATAFORMA DE CONTROL DE PROYECTOS
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Programar, controlar y reportar la obra desde un solo lugar.
              </h1>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                BIM 4D, Last Planner, control por WhatsApp y app móvil de salud de obra —
                trabajando sobre la misma base de datos en tiempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo('contacto')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Solicitar demo <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollTo('suite')}
                  className="border border-slate-600 hover:border-slate-400 text-white px-6 py-3.5 rounded-md font-medium transition-colors"
                >
                  Ver la suite
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-slate-800">
                <div className="text-xs text-slate-500 tracking-widest">CONFÍAN EN NOSOTROS</div>
                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
                  <span>Inspira</span>
                  <span className="text-slate-700">·</span>
                  <span></span>
                  <span className="text-slate-700">·</span>
                  <span>Edificio Abdón Cifuentes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroMockup />
            </div>
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
          />
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
      {[
        { icon: MessageCircle, n: '01', name: 'Canal WhatsApp', tag: 'Entrada',       desc: 'Capataces reportan por el canal que ya usan. IA estructura fotos, audios y guías.', link: 'whatsapp' },
        { icon: Box,           n: '02', name: 'Syncroniza 4D', tag: 'BIM + Gantt',   desc: 'Modelo IFC sincronizado con la programación. Recorrido temporal del proyecto.',  link: 'bim4d' },
        { icon: Calendar,      n: '03', name: 'Last Planner',  tag: 'Semanal',       desc: 'Plan semanal, look-ahead, asistencia y reporte automático con QR de proyecto.', link: 'bim4d' },
        { icon: Truck,         n: '04', name: 'Guías Hormigón', tag: 'Real vs plan', desc: 'Cada guía trazada a partida y ciclo. Curva S y desvío en tiempo real.',         link: 'hormigon' },
        { icon: Smartphone,    n: '05', name: 'App Móvil',     tag: 'Salud de obra', desc: 'Health Score, SPI/CPI/PPC y pronóstico EAC en el bolsillo de la gerencia.',     link: 'salud' },
              ].map((m, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(m.link)}
                  className="group bg-slate-50 hover:bg-white hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 rounded-xl p-6 transition-all duration-300 relative overflow-hidden text-left cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
                  <div className="text-xs font-bold text-orange-500 tracking-widest mb-4">{m.n}</div>
                  <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-transform">
                    <m.icon size={26} className="text-orange-500" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1 text-center">{m.name}</h3>
                  <div className="text-xs uppercase tracking-widest text-orange-500 text-center mb-3">{m.tag}</div>
                  <div className="h-px w-8 bg-slate-300 mx-auto mb-3" />
                  <p className="text-xs text-slate-600 leading-relaxed text-center mb-4">{m.desc}</p>

                  {/* Indicador de click */}
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-slate-400 group-hover:text-orange-500 transition-colors">
                    <span>Ver más</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
           </div>   

          <div className="mt-10 bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <Sparkles size={20} className="text-orange-500 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold tracking-widest text-orange-500 mb-1">UNA SOLA BASE DE DATOS</div>
              <div className="text-slate-300 text-sm leading-relaxed">
                Lo que el capataz reporta en WhatsApp se ve al instante en el 4D y en el Health Score de gerencia.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHATSAPP ============ */}
      <section id="whatsapp" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="02 — Canal de terreno"
            title="WhatsApp es el sistema operativo de la obra."
            description="En vez de pelear con apps que nadie usa, Syncroniza convierte los mensajes que ya pasan en datos estructurados: fotos, audios y guías llegan al sistema con su partida, ciclo y nivel."
          />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-16 items-start">
            <div className="lg:col-span-5">
              <WhatsAppMockup />
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold text-slate-900 mb-8">
                Lo que Syncroniza extrae automáticamente
              </h3>
              <div className="space-y-6">
                {[
                  { t: 'Fotos clasificadas',   d: 'Vision IA detecta tipo de elemento, ubicación y avance estimado.' },
                  { t: 'Audios transcritos',   d: 'Whisper convierte instrucciones y reportes en texto buscable.' },
                  { t: 'Guías de hormigón',    d: 'Lectura OCR de m³, proveedor, hora de llegada y elemento vaciado.' },
                  { t: 'Contexto persistente', d: 'El agente recuerda el proyecto, partidas activas y participantes.' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-teal-700" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">{f.t}</div>
                      <div className="text-slate-600 text-sm leading-relaxed">{f.d}</div>
                    </div>
                  </div>
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
          />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-slate-600 mb-8 leading-relaxed">
                Suba un IFC y un XML de MS Project. Syncroniza 4D mapea elementos con partidas,
                agrupa por ciclos y le permite recorrer el proyecto en el tiempo — antes y después
                de iniciar la obra.
              </p>
              <ul className="space-y-4">
                {[
                  'Visualización 4D por ciclo, semana y partida',
                  'Mapeo WBS ↔ IFC asistido por IA',
                  'Curva S de hormigón con cubicación automática',
                  'Modo avance real: lo ejecutado se pinta en gris',
                  'Last Planner 3D: asignación diaria sobre el modelo',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-teal-600 mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span className="text-slate-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <BIM4DMockup />
              <div className="text-center text-xs text-slate-500 mt-3 italic">
                Vista de Planificación Semanal
              </div>
            </div>
          </div>
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

    {/* Video del proceso completo */}
    <div className="mt-16 relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-950">
      <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </div>
        <div className="text-slate-400 text-xs ml-2">
          Syncroniza · Flujo de captura de guías de hormigón
        </div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        controls
        className="w-full h-auto block"
      >
        <source src="/hormigon-demo.mp4" type="video/mp4" />
      </video>
    </div>

    {/* 3 pasos resumidos debajo del video */}
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {[
        { num: '01', title: 'Captura', desc: 'El capataz envía la foto de la guía por WhatsApp. Sin app, sin formularios.' },
        { num: '02', title: 'Procesa', desc: 'El agente IA lee proveedor, m³, hora, elemento y ciclo en segundos.' },
        { num: '03', title: 'Controla', desc: 'La guía queda trazada en el dashboard, con alerta si hay desvío.' },
      ].map((s, i) => (
        <div key={i} className="flex gap-4">
          <div className="text-3xl font-bold text-orange-500 flex-shrink-0">{s.num}</div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* KPIs */}
    <div className="grid sm:grid-cols-3 gap-4 mt-10">
      {[
        { v: '100%', l: 'de guías trazadas a partida y ciclo', c: 'text-white' },
        { v: '−12%', l: 'promedio en sobrecostos de hormigón',  c: 'text-orange-500' },
        { v: '<30s', l: 'para procesar y validar cada guía',    c: 'text-teal-400' },
      ].map((k, i) => (
        <div key={i} className="bg-slate-900 rounded-xl p-6 flex items-center gap-5">
          <div className={`text-4xl font-bold ${k.c}`}>{k.v}</div>
          <div className="text-sm text-slate-300 leading-snug">{k.l}</div>
        </div>
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
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6 border-l-4 border-l-orange-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-slate-900 text-white text-xs font-bold tracking-wider px-3 py-1.5 rounded">
                        {d.letter}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-slate-900 rounded-xl p-5 flex items-center gap-4">
                <Gauge size={22} className="text-orange-500 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-orange-500 mb-1">
                    HEALTH SCORE · 0–100
                  </div>
                  <div className="text-sm text-slate-300">
                    Las cuatro dimensiones se ponderan en una sola métrica de salud.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY / REASONS ============ */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="text-orange-500 text-xs font-medium tracking-widest mb-4">
              06 — POR QUÉ SYNCRONIZA
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
              Una plataforma. Toda la obra.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Syncroniza no reemplaza al jefe de terreno. Le devuelve las horas que pierde haciendo planillas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-16">
            {[
              { n: '01', t: 'Hecho en Chile, para la obra chilena', d: 'Pensado sobre Last Planner, MS Project y los flujos reales de constructoras locales.' },
              { n: '02', t: 'Implementación en días, no en meses',  d: 'El equipo sigue usando WhatsApp en obra. La oficina ve los datos al instante.' },
              { n: '03', t: 'Suite integrada y modular',            d: 'Empiece por un módulo (Last Planner, Guías, 4D) y crezca al ritmo del proyecto.' },
            ].map((r, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-7">
                <div className="text-orange-500 text-xs font-bold tracking-widest mb-4">{r.n}</div>
                <h3 className="text-lg font-bold mb-3 leading-snug">{r.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contacto" className="py-24 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
            ¿Vemos cómo se aplica a tu obra?
          </h2>
          <p className="text-orange-50 text-lg mb-10 max-w-2xl mx-auto">
            Una demo de 30 minutos con un caso real. Te mostramos cómo conectamos tu programa actual,
            tu BIM y tu WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:contacto@syncroniza.cl"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-md font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              Escribir a contacto@syncroniza.cl <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/56975114550"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-md font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-slate-800 rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm rotate-45" />
                </div>
                <span className="font-bold tracking-widest text-sm text-white">SYNCRONIZA</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
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

            <div>
              <div className="text-white font-medium mb-3 text-sm">Empresa</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white">Casos de éxito</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-3 text-sm">Contacto</div>
              <ul className="space-y-2 text-sm">
                <li>contacto@syncroniza.cl</li>
                <li>Santiago, Chile</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
            <div>© 2026 Syncroniza · Todos los derechos reservados</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Términos</a>
              <a href="#" className="hover:text-white">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============== SUB-COMPONENTS ==============

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-orange-500 text-xs font-medium tracking-widest mb-4">
        {eyebrow}
      </div>
      <h2 className="text-3xl lg:text-5xl font-bold leading-tight text-slate-900 mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-30" />
      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-white font-bold text-sm">Edificio</div>
            <div className="text-slate-500 text-xs mt-0.5">Semana 32 de 78</div>
          </div>
          <div className="bg-amber-900/30 border border-amber-700/50 text-amber-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <AlertTriangle size={12} /> 2 alertas
          </div>
        </div>

        <div className="flex justify-center my-6">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="8"
                strokeDasharray={`${86 * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-3xl font-bold">86</div>
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
            <div className="bg-slate-700 rounded h-20 flex items-center justify-center mb-2">
              <div className="text-white text-xs opacity-60">📷 Foto guía</div>
            </div>
            <div className="text-xs text-slate-700 leading-tight">
              <div className="font-medium">Guía hormigón</div>
              <div className="text-slate-500">Muro eje C, piso 3</div>
            </div>
          </div>
        </div>

        {/* Outgoing system reply */}
        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[80%] shadow-sm">
            <div className="text-xs text-slate-800 leading-relaxed">
              <div className="font-bold text-emerald-800">✓ Guía registrada</div>
              <div className="mt-1 space-y-0.5">
                <div>Nº 0000870036 · Polpaico</div>
                <div>6.0 m³ · G25</div>
                <div>Muro estructural · P3 · Ciclo C-03</div>
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
    <div className="relative bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </div>
        <div className="text-slate-400 text-xs ml-2">Syncroniza 4D · Planificación Semanal</div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto block"
      >
        <source src="/bim4d-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
function Step1Illustration() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3">
      <div className="w-9 h-9 bg-slate-800 rounded flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-slate-900 truncate">Guía Polpaico</div>
        <div className="text-[10px] text-slate-500">6.0 m³ · 09:42</div>
      </div>
      <div className="text-[#34B7F1] font-bold text-sm">✓✓</div>
    </div>
  );
}

function Step2Illustration() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {['Polpaico', '6.0 m³', 'G25', 'Eje C-03'].map((chip, i) => (
        <span key={i} className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1.5 rounded">
          {chip}
        </span>
      ))}
    </div>
  );
}

function Step3Illustration() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-xs text-slate-500 w-8">Real</div>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full" style={{ width: '72%' }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-slate-500 w-8">Plan</div>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative max-w-[280px] mx-auto">
      <div className="bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-slate-950 rounded-[2rem] p-4 space-y-3">
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

          {/* Big ring */}
          <div className="flex justify-center py-2">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="9"
                  strokeDasharray={`${86 * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white text-2xl font-bold">86</div>
                <div className="text-slate-500 text-[9px]">de 100</div>
              </div>
            </div>
          </div>
          <div className="text-center text-[10px] font-bold text-white tracking-widest">SALUD GENERAL</div>
          <div className="text-center text-[10px] text-emerald-500">● En buen estado</div>

          {/* Mini rings */}
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
              <div className="text-2xl font-bold text-orange-500">11</div>
              <div>
                <div className="text-[10px] font-bold text-white">días de atraso</div>
                <div className="text-[8px] text-slate-500">10 abr 2027 · Plan: 30 mar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
