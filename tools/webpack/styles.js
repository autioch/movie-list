const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Joi = require('webpack-validator').Joi;

/* Adds support for scss styles. */
module.exports = function styles(webpackConfig, setup, schemaExtension) {
  webpackConfig.postcss = function postcss() {
    return [autoprefixer];
  };

  webpackConfig.plugins.push(new ExtractTextPlugin(`${setup.assets}[name]${setup.nameSuffix}.css`, {}));

  webpackConfig.resolve.extensions.push('.scss');

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
  });

  webpackConfig.sassLoader = {
    includePaths: [setup.sourcePath]
  };

  schemaExtension.sassLoader = Joi.object();
};
