const path = require('path');

/* Sets up entry files. */
module.exports = function input(webpackConfig, setup) {
  webpackConfig.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: ['es2015']
    }
  });

  webpackConfig.resolve.root.push(path.join(setup.projectPath, 'node_modules'));
};
