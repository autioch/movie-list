const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Joi = require('webpack-validator').Joi;
const path = require('path');

/* Adds support for scss styles. */
module.exports = function styles(webpackConfig, setup, schemaExtension) {
  webpackConfig.postcss = function postcss() {
    return [autoprefixer];
  };

  webpackConfig.plugins.push(new ExtractTextPlugin(`${setup.assets}[name]${setup.nameSuffix}.css`, {}));

  webpackConfig.resolve.extensions.push('.scss');

  const themesRegex = new RegExp(`themes\\${path.sep}.+\\.scss$`);

  webpackConfig.module.loaders.push({
    test: themesRegex,
    loader: 'file?name=themes/[name].css!postcss!sass'
  }, {
    test: /\.scss$/,
    exclude: themesRegex,
    loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
  });

  webpackConfig.sassLoader = { includePaths: [setup.sourcePath] };

  schemaExtension.sassLoader = Joi.object();
};
