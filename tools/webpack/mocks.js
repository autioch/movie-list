module.exports = function mocks(webpackConfig, setup) {
  // if (!setup.isProduction) {
  webpackConfig.resolve.extensions.push('.json');

  webpackConfig.module.loaders.push({
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json'
  });
  // }
};
