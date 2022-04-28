import { Global } from '@emotion/react';

// import x from '../public/fonts/TWDBawalSans.ttf'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Maragsa';
        src: url('./fonts/Maragsa.woff2') format('woff2');
        font-style: normal;
        font-display: swap;
      }
      `}
  />
);

export default Fonts;
