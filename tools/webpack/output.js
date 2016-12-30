const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/* Sets up output. */
module.exports = function output(webpackConfig, setup) {
  Object.assign(webpackConfig.output, {
    path: path.join(setup.projectPath, setup.buildFolder),
    filename: `${setup.assets}[name]${setup.nameSuffix}.js`,
    publicPath: '/',
    chunkFilename: `${setup.assets}[name]${setup.nameSuffix}.js`
  });

  /* Remove previous results of the build. */
  webpackConfig.plugins.push(new CleanWebpackPlugin([path.join(setup.buildFolder, '*')], {
    root: setup.projectPath,
    verbose: false,
    dry: false
  }));
};
