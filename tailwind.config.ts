import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: '#000000',
      text: '#CEFFD9',
      primary: '#41F168',
      tertiary: '#FD39C3',
      quaternary: '#FF3C00',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        paradisio: ['var(--font-paridisio)'],
        diatype: ['var(--font-diatype)'],
        'stretch-sans': ['var(--font-stretch-sans)']
      }
    },
  },
  plugins: [],
};
export default config;
