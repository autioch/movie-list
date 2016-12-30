/* Logs current setup of the webpackConfig. */
module.exports = function logger(webpackConfig, setup) {
  console.log('Env    ', setup.isProduction ? 'Production' : 'Development');
  console.log('Input  ', webpackConfig.entry);
  console.log('Output ', webpackConfig.output.path);
  console.log('Modules', webpackConfig.resolve.root.join('   '));
  console.log('Loaders', webpackConfig.resolveLoader.root.join('   '));
};
