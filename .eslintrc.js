module.exports = {
  extends: 'qb',
  rules: {
    'id-blacklist': ['off'],
    'no-empty-function': ['off'],
    'no-use-before-define': ['error', {
      'functions': false,
      'variables': true,
      'classes': true
    }],
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
    'no-undefined': ['off'],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 2 },
      ObjectPattern: { 'multiline': true }
    }]
  }
};
