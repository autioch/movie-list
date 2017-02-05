module.exports = {
  env: { es6: true },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { experimentalObjectRestSpread: true }
  },
  rules: {

    // require braces around arrow function bodies
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],

    // require parentheses around arrow function arguments
    'arrow-parens': ['error', 'always'],

    // enforce consistent spacing before and after the arrow in arrow functions
    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],

    // require super() calls in constructors
    'constructor-super': ['warn'],

    // enforce consistent spacing around * operators in generator functions
    'generator-star-spacing': ['warn', {
      'before': true,
      'after': false
    }],

    // disallow reassigning class members
    'no-class-assign': ['error'],

    // disallow arrow functions where they could be confused with comparisons
    'no-confusing-arrow': ['warn'],

    // disallow reassigning const variables
    'no-const-assign': ['error'],

    // disallow duplicate class members
    'no-dupe-class-members': ['error'],

    // disallow duplicate module imports
    'no-duplicate-imports': ['error'],

    // disallow new operators with the Symbol object
    'no-new-symbol': ['error'],

    // disallow specified modules when loaded by import
    'no-restricted-imports': ['off'],

    // disallow this/super before calling super() in constructors
    'no-this-before-super': ['warn'],

    // disallow unnecessary computed property keys in object literals
    'no-useless-computed-key': ['error'],

    // disallow unnecessary constructors
    'no-useless-constructor': ['error'],

    // disallow renaming import, export, and destructured assignments to the same name
    'no-useless-rename': ['warn'],

    // require let or const instead of var
    'no-var': ['error'],

    // require or disallow method and property shorthand syntax for object literals
    'object-shorthand': ['warn', 'always'],

    // require arrow functions or named functions as callbacks
    'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],

    // require const declarations for variables that are never reassigned after declared
    'prefer-const': ['error'],

    // disallow parseInt() in favor of binary, octal, and hexadecimal literals
    'prefer-numeric-literals': ['off'],

    // require rest parameters instead of arguments
    'prefer-rest-params': ['off'],

    // require spread operators instead of .apply()
    'prefer-spread': ['off'],

    // require template literals instead of string concatenation
    'prefer-template': ['warn'],

    // require generator functions to contain yield
    'require-yield': ['warn'],

    // enforce spacing between rest and spread operators and their expressions
    'rest-spread-spacing': ['error', 'never'],

    // enforce sorted import declarations within modules
    'sort-imports': ['off'],

    // require symbol descriptions
    'symbol-description': ['error'],

    // require or disallow spacing around embedded expressions of template strings
    'template-curly-spacing': ['off'],

    // require or disallow spacing around the * in yield* expressions
    'yield-star-spacing': ['off']
  }
};
