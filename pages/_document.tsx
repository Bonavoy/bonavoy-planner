import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
