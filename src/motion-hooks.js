import { useEffect, useRef, useState } from 'react';

/**
 * Hooks de movimiento, sin librerías.
 *
 * Van separados de motion.jsx porque Fast Refresh solo funciona cuando un
 * archivo exporta *o* componentes *o* otras cosas, nunca las dos.
 *
 * La landing no tiene Framer Motion ni GSAP y no vale la pena sumar 50KB por
 * media docena de efectos. Todo esto es IntersectionObserver + rAF + transform,
 * que es lo único que el navegador anima en la GPU sin recalcular layout.
 */

// ---------------------------------------------------------------------------
// Accesibilidad: si el sistema pide menos movimiento, TODO esto se apaga.
// No es un detalle opcional — el movimiento de scroll dispara vértigo real.
// ---------------------------------------------------------------------------
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// useInView — dispara una sola vez, cuando el elemento entró un 20% al viewport.
// Ese -20% es lo que hace que el contenido ya esté en movimiento cuando el ojo
// llega: si disparas en el borde exacto, se ve como que llega tarde.
// ---------------------------------------------------------------------------
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -20% 0px' } = {}) {
  const ref = useRef(null);

  // Sin soporte de IntersectionObserver arrancamos ya visibles. Va en el
  // inicializador y no en el efecto: hacerlo dentro del efecto obliga a React
  // a renderizar dos veces y además el contenido parpadea invisible un frame.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target); // once: nunca se vuelve a esconder
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

// ---------------------------------------------------------------------------
// useParallax — escribe el progreso de scroll (0→1) del elemento en --p.
// Un solo listener con rAF. Nada de setState por scroll: el valor va directo a
// una custom property del DOM, así React no re-renderiza 60 veces por segundo.
// Los hijos heredan --p, así que una sola llamada mueve toda una capa.
// ---------------------------------------------------------------------------
export function useParallax() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = null;

    const update = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el elemento recién entra por abajo, 1 cuando salió por arriba
      const p = (vh - r.top) / (vh + r.height);
      el.style.setProperty('--p', Math.min(Math.max(p, 0), 1).toFixed(4));
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return ref;
}

// ---------------------------------------------------------------------------
// useRingProgress — el anillo del Health Score se dibuja al entrar.
// ---------------------------------------------------------------------------
export function useRingProgress(target, duration = 1600) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);

  return [ref, reduced ? target : v];
}
