import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>LNK | Freelance Remote</title>
      <Head>
        <meta name="description" content="Test Freelance Remote" />
        <meta property="og:title" content="LNK | Freelance Remote" />
        <meta property="og:description" content="Freelance Remote" />
        <meta name="keywords" content="freelance, remote, next, nest, mongo" />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
