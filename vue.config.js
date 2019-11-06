const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData:`
          @import "~@/styles/custom.scss";
        `
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/custom.scss")]
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
