import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>The Blind Test: The Undecided Voters&apos; Guide</title>

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@reccreateph" />
        <meta name="twitter:creator" content="@carldegs" />
        <meta property="og:url" content="https://blindtest.carldegs.com/" />
        <meta property="og:title" content="The Blind Test" />
        <meta
          property="og:description"
          content="Still haven't decided who your next President will be? Take the test and find out!"
        />
        <meta
          property="og:image"
          content="https://blindtest.carldegs.com/img/og-image.jpg"
        />
        <meta property="fb:app_id" content="365617072026477" />
        <meta property="og:type" content="article" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
