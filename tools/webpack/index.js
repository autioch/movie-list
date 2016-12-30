// TODO https://www.npmjs.com/package/webpack-merge
const path = require('path');

const mixins = [
  require('./aliases'),
  require('./enviroment'),
  require('./externals'),
  require('./fonts'),
  require('./input'),
  require('./mocks'),
  require('./output'),
  require('./scripts'),
  require('./styles'),
  require('./templates'),
  require('./logger'), // This should be after all other parts
  require('./validation') // This should be after all other parts
];

module.exports = function configure(setup) {
  /* Plain object that will be used for extending validation schema. */
  const validationSchema = {};

  /* Base, "empty' config that will be extended by mixins. */
  const webpackConfig = {
    entry: {},
    output: {},
    resolve: {
      root: [path.join(setup.sourcePath)],
      extensions: ['', '.js'],
      alias: {}
    },
    module: { loaders: [] },
    plugins: [],
    resolveLoader: {
      root: [path.join(setup.projectPath, 'node_modules')],
      alias: {}
    },
    stats: {
      children: false, // Avoid "child extract-text-webpack-plugin" spam,
      hash: false,
      version: false,
      colors: true
    }
  };

  /* Extends base config with mixins. */
  mixins.forEach((mixin) => mixin(webpackConfig, setup, validationSchema));

  /* Completed config. */
  return webpackConfig;
};
