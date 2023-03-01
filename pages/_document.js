import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { APP_NAME, DEFAULT_LANGAGE, WEBSITE_NAME } from '@/constants';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang={DEFAULT_LANGAGE}>
        <Head>
          {CssBaseline.flush()}
          <meta charSet="utf-8" />
          <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
  />
  
          <link
            rel="icon"
            type="image/ico"
            href="/images/favicon.ico"
          />
                    <link
            rel="icon"
            type="image/ico"
            sizes="16x16"
            href="/images/favicon.ico"
          />
          <link
            rel="icon"
            type="image/ico"
            sizes="32x32"
            href="/images/favicon.ico"
          />
          <link 
          rel="shortcut icon" 
          href="/images/favicon.ico"
          />
          <link
            rel="icon"
            type="image/ico"
            sizes="64x64"
            href="/images/favicon.ico"
          />
          <link rel="manifest" href="/manifest.json" />

          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=swap"
          />

          <meta name="theme-color" content="#E8602F" />

          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="apple-touch-icon" href="/images/logos/logo_orange_pic_no_back.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/logos/logo_orange_pic_no_back.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/logos/logo_orange_pic_no_back.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/images/logos/logo_orange_pic_no_back.png" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/images/logos/logo_orange_maskable_x512.png" color="#FFFFFFFF" />
          <link rel="shortcut icon" href="/images/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://drilldev.com" />
          <meta name="twitter:title" content={WEBSITE_NAME} />
          <meta name="twitter:image" content="/images/logos/logo_orange_pic_no_back.png" />
          <meta name="twitter:creator" content="@DrillDev" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={WEBSITE_NAME} />
          <meta property="og:description" content="See, download and share.ose" />
          <meta property="og:site_name" content={WEBSITE_NAME} />
          <meta property="og:url" content="https://drilldev.com" />
          <meta property="og:image" content="/images/logos/logo_orange_pic_no_back.png" />
        </Head>
        <body>
          
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
