const StringReplacePlugin = require('string-replace-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/*  Minifies templates html/svg.
 * As a side effect (a good one), all inline-block elements will be next to each other, preventing the infamous spaces. */
const templateRegexes = [{
  pattern: /(\t|\\r|\\n)/g,
  replacement: () => ' '
}, {
  pattern: / +/g,
  replacement: () => ' '
}, {
  pattern: /<% %>/g,
  replacement: () => ''
}, {
  pattern: /> </g,
  replacement: () => '><'
}, {
  pattern: /<% }\) %>/g,
  replacement: () => '<%})%>'
}];

/* Adds support for:
 * - html templates,
 * - misc files that are just copied,
 * - the base html file.
 */
module.exports = function templates(webpackConfig, setup) {
  webpackConfig.module.loaders.push({
    test: /\.tpl$/,
    exclude: /node_modules/,
    loader: StringReplacePlugin.replace({ replacements: templateRegexes }, 'underscore-template-loader?engine=lodash')
  }, {
    test: /\.+svg$/,
    exclude: /(node_modules)/,
    loader: StringReplacePlugin.replace({ replacements: templateRegexes }, 'html')
  }, {
    test: /\.ico$/i,
    exclude: /node_modules/,
    loader: 'file?name=[name].[ext]'
  }, {
    test: /\.png$/i,
    exclude: /node_modules/,
    loader: 'url'
  });
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(setup.sourcePath, 'index.html'),
      filename: 'index.html',
      allChunks: true
    }),
    new StringReplacePlugin()
  );
};
