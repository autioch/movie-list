/* Excludes predefined libraries from being included in the package. */
module.exports = function fonts(webpackConfig) {
  webpackConfig.externals = Object.assign({});
};
