// Require the polyfill before requiring any other modules.
//require('intersection-observer');
//const { DEFAULT_LANGAGE, LANGAGE_ENGLISH } = require('./constants.js');
//const { i18n } = require('./next-i18next.config')
//const { i18n } = require('next-i18next/server/config')
//module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  //nextConfig,
  //webpack5: true,
  webpack: (nextConfig) => {
    nextConfig.resolve.fallback = { 
      //reactStrictMode: true,
      fs: false,
      //timers: false,
      //process: false,
    };

    return nextConfig;
  },
  
  //nextConfig,
  i18n: {
    defaultLocale: 'fr',
  locales: ['fr', 'en', 'pt'],
  localeDetection: true,
  },
  env: {
    domain: process.env.NODE_ENV === "production" ? 'https://www.drilldev.com' : 'http://localhost:3000',
  },
  images: {
    domains: ['pictures.dandela.com'],
  },
  /*
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
  */
})
