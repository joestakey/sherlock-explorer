import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="icon" href="favicons/favicon.ico" />
        <link rel="manifest" href="favicons/site.webmanifest" />
        <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Get all your Sherlock contests findings in one report" />
        <meta name="author" content="joe stakey" />
        <meta property="og:image" content="images/facebookImage.png" />
        <meta property="og:description" content="Get all your Sherlock contests findings in one report" />
        <meta property="og:title" content="Sherlock Explorer" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sherlock Explorer" />
        <meta name="twitter:description" content="Get all your Sherlock contests findings in one report" />
        <meta name="twitter:image" content="images/facebookImage.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
