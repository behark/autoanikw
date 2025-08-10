import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Preload fonts and critical CSS */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          
          {/* Force immediate CSS loading */}
          <link
            rel="stylesheet"
            href="/_next/static/css/styles.css"
            data-n-g=""
            id="__nextStyles"
          />
        </Head>
        <body className="bg-gray-50 text-gray-900 min-h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
