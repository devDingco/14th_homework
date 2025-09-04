import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Customizing
    screens: {
      tablet: '780px',
      desktop: '1920px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        Pretendard: ['var(--font-Pretendard)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
export default config;
