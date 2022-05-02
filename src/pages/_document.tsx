import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>The Blind Test: The Undecided Voters&apos; Guide</title>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-KKZWZEP9PG`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-KKZWZEP9PG');
          `,
          }}
        />

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
