import { Fragment, useEffect, useState } from 'react';
import { usePrefersReducedMotion, useInView } from './motion-hooks';

/**
 * Componentes de movimiento. Los hooks viven en motion-hooks.js.
 *
 * Los números (0.6s, ease-out, disparar al 20% dentro del viewport, 40ms entre
 * palabras) no son al azar: son los defaults del catálogo de silk-design.
 *
 * Todos short-circuitan a un render estático cuando el sistema pide menos
 * movimiento. Las clases que usan (silk-reveal, silk-word…) están en index.css.
 */

// ---------------------------------------------------------------------------
// <Reveal> — envuelve cualquier bloque y lo entra al hacer scroll.
// El stagger se consigue pasando delay creciente a los hermanos (0, 80, 160…).
// ---------------------------------------------------------------------------
export function Reveal({
  children,
  delay = 0,
  y = 20,
  x = 0,
  blur = false,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView();

  if (reduced) {
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      // El blur va en su propia clase y no en una custom property: así los
      // bloques que no lo piden ni siquiera tienen `filter` en la transición,
      // que es lo que obliga al navegador a rasterizar la capa aparte.
      className={`silk-reveal ${blur ? 'silk-reveal-blur' : ''} ${inView ? 'is-in' : ''} ${className}`}
      style={{
        '--reveal-y': `${y}px`,
        '--reveal-x': `${x}px`,
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// <RevealText> — el título entra palabra por palabra.
// Cada palabra va en un <span> con overflow oculto para que suba "desde abajo
// de la línea" en vez de simplemente aparecer.
// ---------------------------------------------------------------------------
export function RevealText({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 40,
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const palabras = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {palabras.map((palabra, i) => (
        // El espacio va FUERA de .silk-word. Adentro lo recorta el
        // overflow:hidden y el título sale todo pegado; afuera es un nodo de
        // texto normal, que además es por donde el navegador corta la línea.
        <Fragment key={i}>
          <span className="silk-word">
            <span
              className={`silk-word-inner ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {palabra}
            </span>
          </span>
          {i < palabras.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// <Counter> — la cifra sube desde 0 cuando entra en pantalla.
// Un número que ya está escrito no se lee; un número que sube, sí.
// ---------------------------------------------------------------------------
export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
  className = '',
  // El -20% de abajo hace que el resto de la página entre "a tiempo", pero a un
  // número que vive al pie de un bloque alto lo deja congelado en 0 mientras ya
  // se lee — y un 0 que contradice al texto de al lado parece un bug, no una
  // animación. Esos casos pasan rootMargin="0px".
  rootMargin = '0px 0px -20% 0px',
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ rootMargin });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let raf;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      // easeOutExpo: arranca rápido y frena — se lee como que "aterriza"
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  const mostrado = reduced ? value : n;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {mostrado.toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  );
}
