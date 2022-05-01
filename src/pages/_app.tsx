import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/sora';
import Head from 'next/head';
import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';

import Fonts from '../Fonts';
import { store } from '../store';
import theme from '../theme';

// TODO: Investigate why failing when using AppProps type
const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Provider store={store}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Fonts />
            <Head>
              <title>The Blind Test: The Undecided Voters&apos; Guide</title>
              <meta name="twitter:card" content="summary"></meta>
              <meta name="twitter:site" content="@reccreateph" />
              <meta name="twitter:creator" content="@carldegs" />
              <meta
                property="og:url"
                content="https://blindtest.carldegs.com/"
              />
              <meta property="og:title" content="The Blind Test" />
              <meta
                property="og:description"
                content="Still haven't decided who your next President will be? Take the test and find out!"
              />
              <meta
                property="og:image"
                content="https://blindtest.carldegs.com/img/og-image.jpg"
              />
            </Head>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
