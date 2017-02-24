module.exports = function mocks(webpackConfig, setup) {
  webpackConfig.resolve.extensions.push('.json');

  webpackConfig.module.loaders.push({
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json'
    // loader: setup.isProduction ? `file?name=${setup.assets}[name].[ext]` : 'json'
  });
};
