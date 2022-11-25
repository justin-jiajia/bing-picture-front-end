module.exports = {
  pwa: {
    name: "Bing每日一图",
    themeColor: '#1AE66B',
    msTileColor: '#1AE66B',
    manifestOptions: {
      start_url: ".",
      background_color: '#1AE66B'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/favicon.ico',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: "img/icons/favicon.ico",
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {},
  },
};
