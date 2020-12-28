/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./tools/webpack');
const projectPath = path.resolve(__dirname);

module.exports = function movieList(options) {
  const isProduction = options.isProduction === undefined ? true : options.isProduction;

  if (!options.buildFolder) {
    return Promise.reject(new Error('Movie-list: No buildFolder specified'));
  }

  const config = webpackConfig({
    isProduction,
    projectPath,
    isWatch: false,
    sourcePath: path.join(projectPath, 'src'),
    buildFolder: options.buildFolder,
    nameSuffix: new Date().getTime() + (isProduction ? '.min' : ''),
    assets: 'files/'
  });

  return new Promise((resolve, reject) => {
    webpack(config, (err, details) => {
      if (err) {
        reject(err);
      }
      resolve(details);
    });
  });
};
