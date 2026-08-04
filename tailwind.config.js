/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // C'est ici qu'on définit nos couleurs pour qu'elles soient disponibles
      // en tant que classes comme 'bg-primary' ou 'text-dark'
      colors: {
        //primary: '#C27835',
        primary: '#C59D5F', 
        // Un ton plus foncé pour le survol (Hover)
        'primary-dark': '#A07D45',
        // Un beige très clair pour le fond de page (au lieu du blanc pur)
        background: '#FAF9F6', 
        // Un gris/marron foncé pour le texte (plus doux que le noir)
        dark: '#2D241E',
        // Le vert palmier pour les petites touches
        palm: '#4A5D23', 
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '2rem', 
      }
    },
  },
  plugins: [],
}

