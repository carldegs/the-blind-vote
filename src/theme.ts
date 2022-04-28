import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Maragsa, serif',
    body: 'Sora, sans-serif',
  },
  styles: {
    global: {
      html: {
        height: '100vh',
        overscrollBehavior: 'none',
      },
      body: {
        overscrollBehavior: 'none',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'regular',
        letterSpacing: 'tight',
      },
    },
  },
});

export default theme;
