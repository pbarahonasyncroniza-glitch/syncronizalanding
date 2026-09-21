/** @type {import('tailwindcss').Config} */

// Paleta real de Syncroniza. Los tres azules salen del isotipo
// (public/syncroniza-isotipo.png, muestreados pixel a pixel) y el resto son los
// mismos design tokens que usa la app en producción (web/tailwind.config.js del
// core), para que la landing y el producto no se vean como dos marcas distintas.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Azul de marca — el mismo de la app
        brand: {
          DEFAULT: "#2A6CC9",
          hover: "#235AAD",
          press: "#1C4A8F",
          ink: "#1E56A8",
          soft: "#E8F0FB",
          border: "#B9D2F0",
        },
        // Las tres caras del isotipo
        iso: {
          navy: "#20366F", // cara oscura
          mid: "#0C699D", // cara intermedia
          sky: "#37B6FF", // cara clara
        },
        // Superficies
        canvas: "#EDEFF3",
        surface: "#FFFFFF",
        surface2: "#F9FAFB",
        // Fondo oscuro (hero / footer) — idéntico al nav de la app
        nav: {
          bg: "#0E1420",
          elev: "#171E2B",
          border: "#1B2230",
          border2: "#262F3F",
          text: "#98A2B3",
          hi: "#E7EAF0",
          faint: "#5B6472",
        },
        // Tipografía
        ink: {
          DEFAULT: "#101828",
          2: "#344054",
          3: "#475467",
          muted: "#667085",
          faint: "#98A2B3",
        },
      },
      fontFamily: {
        ui: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        display: ['"Archivo"', '"IBM Plex Sans"', "sans-serif"],
      },
      borderRadius: {
        sm: "9px",
        md: "14px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16,24,40,.05)",
        md: "0 1px 3px rgba(16,24,40,.06)",
        lg: "0 4px 14px rgba(14,20,32,.24)",
        glow: "0 8px 30px rgba(42,108,201,.28)",
      },
    },
  },
  plugins: [],
};
