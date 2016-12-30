const LiveReloadPlugin = require('webpack-livereload-plugin');

/* Configures config for production. */
module.exports = function development(webpackConfig) {
  /* Adds sourcemaps for js.*/
  webpackConfig.devtool = '#eval';

  /* Runs livereload. */
  webpackConfig.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
    ignore: /.(js|config|ico|woff)$/
  }));
};
