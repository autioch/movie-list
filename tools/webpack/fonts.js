/* Adds support for font files, which are just copied. */
module.exports = function fonts(webpackConfig, setup) {
  webpackConfig.module.loaders.push({
    test: /\.(ttf|eot|woff)$/i,
    exclude: /node_modules/,
    loader: `file?name=${setup.assets}[name].[ext]`
  });
};
