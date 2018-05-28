require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  geoBlock: typeof process.env.GEOBLOCK === 'undefined' ? true : (process.env.GEOBLOCK === 'true' || process.env.GEOBLOCK === true),
  playerHost: typeof process.env.STAGING !== 'undefined' && (process.env.STAGING === true || process.env.STAGING === 'true') ? 'https://staging.player.dotstudiopro.com' : 'https://player.dotstudiopro.com',
  dev: {
    domain: 'http://localhost:3000'
  },
  live: {
    domain: typeof process.env.STAGING !== 'undefined' && (process.env.STAGING === true || process.env.STAGING === 'true') ? '//noseyshows.com' : '//nosey.com'
  },
  auth0: {
    clientId: 'SenihIPMySJ5y83L5g88M3WnWfl1erBs',
    domain: 'dotstudiopro.auth0.com'
  },
  googleAnalytics: 'UA-76362791-1',
  api: {
    baseUrl: 'https://api.myspotlight.tv',
    timeout: 10000,
    noseyApiKey: '84b1403831a8f9ea1763d40d187246765417e8c5',
    company_id: '57fe8fe399f815e309dbc2f4', // Nosey
    defaultCountryCode: 'US'
  },
  app: {
    title: 'Nosey',
    description: 'Nosey lets you watch shows such as Cheaters, Jerry Springer, Maury, Steve Wilkos, Family Feud, & many more!',
    head: {
      titleTemplate: '%s | Nosey - TV Shows Online',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Disable tap highlight on IE
        { name: 'msapplication-tap-highlight', content: 'no' },
        // Add to homescreen for Chrome on Android
        { name: 'mobile-web-app-capable', content: 'yes' },
        // Add to homescreen for Safari on IOS
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'apple-mobile-web-app-title', content: 'Nosey' },
        // Tile icon for Win8 (144x144 + tile color)
        // { name: 'msapplication-TileImage', content: msFavicon }, //TODO: get this icon
        { name: 'msapplication-TileColor', content: '#61F061' },
        // { name: 'google-site-verification', content: 'CPUt5HJHefR71i7yzu9NqNkpS4UWjN3n4cIauesdb-E' },

        // Top level metadata
        { name: 'author', content: 'Nosey Baxter LLC.' },
        { name: 'copyright', content: 'Nosey Baxter LLC. All rights reserved.' },
        { name: 'title', content: 'Nosey' },
        { name: 'description', content: 'Nosey lets you watch shows such as Cheaters, Jerry Springer, Maury, Steve Wilkos, Family Feud, & many more!' },
        { name: 'keywords', content: 'Nosey, tv, shows, online, watch, episodes, reality, talk, game' },

        // Links to mobile apps in play stores
        { name: 'apple-itunes-app', content: 'app-id=1190636061' },
        { name: 'google-play-app', content: 'app-id=com.dotstudioz.dotstudioPRO.nosey' },
        { property: 'fb:app_id', content: '365760873784674' },

        // Social-specific metadata below
        {
          property: "og:description",
          content: "Nosey lets you watch shows such as Cheaters, Jerry Springer, Maury, Steve Wilkos, Family Feud, & many more!"
        },
        { property: "og:image", content: "https://dke5fmveuky7d.cloudfront.net/img/nosey-card.jpg" },
        { property: "og:site_name", content: "Nosey" },
        { property: "og:title", content: "Nosey" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.nosey.com" },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@getnosey' },
        {
          name: 'twitter:description',
          content: 'Nosey lets you watch shows such as Cheaters, Jerry Springer, Maury, Steve Wilkos, Family Feud, & many more!'
        },
        { name: 'twitter:image:src', content: 'https://dke5fmveuky7d.cloudfront.net/img/nosey-card.jpg' },
        { name: 'twitter:site', content: '@getnosey' },
        { name: 'twitter:title', content: 'Nosey' },
        // End social metadata

      ],
      link: [
        // Add to homescreen for Chrome on Android
        { rel: 'icon', href: 'favicon.ico' },
        { rel: 'icon', sizes: '192x192', href: 'chromeFavicon.png' },
        // Add to homescreen for Safari on IOS
        { rel: 'apple-touch-icon', sizes: '152x152', href: 'appleFavicon.png' },
        { rel: 'canonical', href: 'https://www.nosey.com' }
      ]
    },
    lockScreenShown: 'LOCK_SCREEN_SHOWN',
    logo: 'https://s3.amazonaws.com/nosey-website/nosey-logo-lg.png',
    links: {
      android: 'https://play.google.com/store/apps/details?id=com.dotstudioz.dotstudioPRO.nosey&hl=en',
      appleTv: 'https://itunes.apple.com/us/app/nosey-watch-full-tv-episodes-tv-shows/id1190636061?mt=8',
      ios: 'https://itunes.apple.com/us/app/nosey-watch-full-tv-episodes-tv-shows/id1190636061?mt=8',
      roku: 'https://channelstore.roku.com/details/143535/nosey'
    }
  },
}, environment);
