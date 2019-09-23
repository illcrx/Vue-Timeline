const pkg = require("./package.json");

process.env.VUE_APP_VUE_TIMELINE_VERSION = pkg.version;

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
};
