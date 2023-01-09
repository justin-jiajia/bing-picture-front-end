module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.jiajia.bingpicture",
        productName: "Bing每日一图",
        copyright: "Copyright jiajia © 2022",
      },
    },
  },
  pwa: {
    name: 'Bing每日一图',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      start_url: '.',
      background_color: '#FFFFFF'
    },
    workboxOptions: {}
  },
};
