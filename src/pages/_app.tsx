import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/sora';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';

import Fonts from '../Fonts';
import { store } from '../store';
import theme from '../theme';
import { sendPageViewEvent } from '../utils/gtag';

// TODO: Investigate why failing when using AppProps type
const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      sendPageViewEvent(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Provider store={store}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
