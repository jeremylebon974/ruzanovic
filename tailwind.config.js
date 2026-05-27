/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette Ruzanovic
        'rz-black': '#0a0a0a',
        'rz-white': '#f5f2ee',
        'rz-cream': '#ede8e0',
        'rz-warm': '#d4cfc8',
        'rz-stone': '#8a8580',
        'rz-ink': '#1a1a1a',
        // Accents signature de la collection
        'rz-orange': '#e84c1e',
        'rz-fluo': '#d4f000',
        'rz-fuchsia': '#e8006a',
      },
      fontFamily: {
        'display': ['var(--font-cormorant)', 'Georgia', 'serif'],
        'body': ['var(--font-jost)', 'Helvetica', 'sans-serif'],
        'mono': ['var(--font-dm-mono)', 'monospace'],
      },
      letterSpacing: {
        'ultra': '0.35em',
        'wide-luxury': '0.2em',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'reveal': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.5s ease forwards',
        'line-expand': 'lineExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-reveal': 'textReveal 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineExpand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        textReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
