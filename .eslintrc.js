module.exports = {
  extends: [
    './tools/eslint/enviroment',
    './tools/eslint/es6',
    './tools/eslint/best-practices',
    './tools/eslint/common-js',
    './tools/eslint/possible-errors',
    './tools/eslint/strict-mode',
    './tools/eslint/stylistic-issues',
    './tools/eslint/variables'
  ].map(require.resolve),
  rules: {
    'no-console': ['off']
  }
};
