import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chilli: {
          red: '#FF0000',
          black: '#1A1A1A',
          orange: '#FF6B00',
          blue: '#0066FF',
          green: '#00CC66',
          purple: '#8B00FF',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'chilli-gradient': 'linear-gradient(45deg, #FF0000 30%, #FF3333 90%)',
        'chilli-gradient-hover': 'linear-gradient(45deg, #CC0000 30%, #FF0000 90%)',
      },
      boxShadow: {
        'chilli': '0 4px 20px rgba(255, 0, 0, 0.2)',
        'chilli-strong': '0 6px 25px rgba(255, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;