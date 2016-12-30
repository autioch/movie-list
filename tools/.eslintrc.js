module.exports = {
  extends: [
    './eslint/enviroment',
    './eslint/best-practices',
    './eslint/common-js',
    './eslint/es6',
    './eslint/possible-errors',
    './eslint/strict-mode',
    './eslint/stylistic-issues',
    './eslint/variables'
  ].map(require.resolve),
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': ['off']
  }
};
