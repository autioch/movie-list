module.exports = {
  rules: {

    // disallow assignment operators in conditional expressions
    'no-cond-assign': ['warn'],

    // disallow the use of console apart from warn and error
    'no-console': ['error', {
      allow: ['warn', 'error']
    }],

    // disallow constant expressions in conditions
    'no-constant-condition': ['error'],

    // disallow control characters in regular expressions
    'no-control-regex': ['error'],

    // disallow the use of debugger
    'no-debugger': ['error'],

    // disallow duplicate arguments in function definitions
    'no-dupe-args': ['error'],

    // disallow duplicate keys in object literals
    'no-dupe-keys': ['error'],

    // disallow duplicate case labels
    'no-duplicate-case': ['error'],

    // disallow empty character classes in regular expressions
    'no-empty-character-class': ['error'],

    // disallow empty block statements
    'no-empty': ['error', {
      allowEmptyCatch: true
    }],

    // disallow reassigning exceptions in catch clauses
    'no-ex-assign': ['error'],

    // disallow unnecessary boolean casts
    'no-extra-boolean-cast': ['error'],

    // disallow unnecessary parentheses
    'no-extra-parens': ['warn', 'functions'],

    // disallow unnecessary semicolons
    'no-extra-semi': ['error'],

    // disallow reassigning function declarations
    'no-func-assign': ['error'],

    // disallow variable or function declarations in nested blocks
    'no-inner-declarations': ['error'],

    // disallow invalid regular expression strings in RegExp constructors
    'no-invalid-regexp': ['error'],

    // disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': ['error'],

    // disallow calling global object properties as functions
    'no-obj-calls': ['error'],

    // disallow calling some Object.prototype methods directly on objects
    'no-prototype-builtins': ['off'],

    // disallow multiple spaces in regular expressions
    'no-regex-spaces': ['error'],

    // disallow sparse arrays
    'no-sparse-arrays': ['error'],

    // disallow template literal placeholder syntax in regular strings
    'no-template-curly-in-string': ['error'],

    // disallow confusing multiline expressions
    'no-unexpected-multiline': ['error'],

    // disallow unreachable code after return, throw, continue, and break statements
    'no-unreachable': ['error'],

    // disallow control flow statements in finally blocks
    'no-unsafe-finally': ['error'],

    // disallow negating the left operand of relational operators
    'no-unsafe-negation': ['error'],

    // require calls to isNaN() when checking for NaN
    'use-isnan': ['error'],

    // enforce valid JSDoc comments
    'valid-jsdoc': ['warn'],

    // enforce comparing typeof expressions against valid strings
    'valid-typeof': ['error']
  }
};
