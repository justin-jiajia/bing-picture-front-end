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
    name: "Bing每日一图",
    themeColor: "#1AE66B",
    msTileColor: "#1AE66B",
    manifestOptions: {
      start_url: ".",
      background_color: "#1AE66B",
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {},
  },
};
