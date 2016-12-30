module.exports = { rules: {

    // enforce consistent spacing inside array brackets
  'array-bracket-spacing': ['error'],

    // enforce consistent spacing inside single-line blocks
  'block-spacing': ['error'],

    // enforce consistent brace style for blocks
  'brace-style': ['error'],

    // enforce camelcase naming convention
  'camelcase': ['error', { properties: 'never' }],

    // require or disallow trailing commas
  'comma-dangle': ['error'],

    // enforce consistent spacing before and after commas
  'comma-spacing': ['error'],

    // enforce consistent comma style
  'comma-style': ['error'],

    // enforce consistent spacing inside computed property brackets
  'computed-property-spacing': ['error'],

    // enforce consistent naming when capturing the current execution context
  'consistent-this': ['off'],

    // require or disallow newline at the end of files
  'eol-last': ['error'],

    // require or disallow spacing between function identifiers and their invocations
  'func-call-spacing': ['error'],

    // require function names to match the name of the variable or property to which they are assigned
  'func-name-matching': ['warn'],

    // require or disallow named function expressions
  'func-names': ['off'],

    // enforce the consistent use of either function declarations or expressions
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

    // disallow specified identifiers
  'id-blacklist': ['error', 'sb'],

    // enforce minimum and maximum identifier lengths
  'id-length': ['warn', {
    min: 2,
    max: 30,
    properties: 'never',
    exceptions: ['_', '$', 'i', 'j', 'x', 'y', 'h', 'w']
  }],

    // require identifiers to match a specified regular expression
  'id-match': ['error'],

    // enforce consistent indentation
  'indent': ['error', 2, { MemberExpression: 1 }],

    // enforce the consistent use of either double or single quotes in JSX attributes
  'jsx-quotes': ['error'],

    // enforce consistent spacing between keys and values in object literal properties
  'key-spacing': ['error'],

    // enforce consistent spacing before and after keywords
  'keyword-spacing': ['error'],

    // enforce position of line comments
  'line-comment-position': ['off'],

    // enforce consistent linebreak style
  'linebreak-style': ['off'],

    // require empty lines around comments
  'lines-around-comment': ['warn', { allowBlockStart: true }],

    // require or disallow newlines around directives
  'lines-around-directive': ['error'],

    // enforce a maximum depth that blocks can be nested
  'max-depth': ['error'],

    // enforce a maximum line length
  'max-len': ['warn', { code: 140 }],

    // enforce a maximum number of lines per file
  'max-lines': ['warn', {
    max: 300,
    skipBlankLines: true,
    skipComments: true
  }],

    // enforce a maximum depth that callbacks can be nested
  'max-nested-callbacks': ['error'],

    // enforce a maximum number of parameters in function definitions
  'max-params': ['error', 6],

    // enforce a maximum number of statements allowed per line
  'max-statements-per-line': ['error'],

    // enforce a maximum number of statements allowed in function blocks
  'max-statements': ['warn', 30],

    // enforce newlines between operands of ternary expressions
  'multiline-ternary': ['warn', 'never'],

    // require constructor names to begin with a capital letter
  'new-cap': ['error'],

    // require parentheses when invoking a constructor with no arguments
  'new-parens': ['error'],

    // require or disallow an empty line after variable declarations
  'newline-after-var': ['warn'],

    // require an empty line before return statements
  'newline-before-return': ['warn'],

    // require a newline after each call in a method chain
  'newline-per-chained-call': ['off'],

    // disallow Array constructors
  'no-array-constructor': ['error'],

    // disallow bitwise operators
  'no-bitwise': ['off'],

    // disallow continue statements
  'no-continue': ['off'],

    // disallow inline comments after code
  'no-inline-comments': ['off'],

    // disallow if statements as the only statement in else blocks
  'no-lonely-if': ['warn'],

    // disallow mixed binary operators
  'no-mixed-operators': ['warn', { allowSamePrecedence: true }],

    // disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': ['error'],

    // disallow multiple empty lines
  'no-multiple-empty-lines': ['error', { max: 1 }],

    // disallow negated conditions
  'no-negated-condition': ['warn'],

    // disallow nested ternary expressions
  'no-nested-ternary': ['warn'],

    // disallow Object constructors
  'no-new-object': ['error'],

    // disallow the unary operators ++ and --
  'no-plusplus': ['off'],

    // disallow specified syntax
  'no-restricted-syntax': ['error'],

    // disallow all tabs
  'no-tabs': ['error'],

    // disallow ternary operators
  'no-ternary': ['off'],

    // disallow trailing whitespace at the end of lines
  'no-trailing-spaces': ['error'],

    // disallow dangling underscores in identifiers
  'no-underscore-dangle': ['off'],

    // disallow ternary operators when simpler alternatives exist
  'no-unneeded-ternary': ['error'],

    // disallow whitespace before properties
  'no-whitespace-before-property': ['error'],

    // enforce consistent line breaks inside braces
  'object-curly-newline': ['error', {
    ObjectExpression: { minProperties: 2 },
    ObjectPattern: { 'multiline': true }
  }],

    // enforce consistent spacing inside braces
  'object-curly-spacing': ['error', 'always', { arraysInObjects: true }],

    // enforce placing object properties on separate lines
  'object-property-newline': ['error'],

    // require or disallow newlines around variable declarations
  'one-var-declaration-per-line': ['error'],

    // enforce variables to be declared either together or separately in functions
  'one-var': ['warn', {
    initialized: 'never',
    uninitialized: 'never'
  }],

    // require or disallow assignment operator shorthand where possible
  'operator-assignment': ['error'],

    // enforce consistent linebreak style for operators
  'operator-linebreak': ['error'],

    // require or disallow padding within blocks
  'padded-blocks': ['error', 'never'],

    // require quotes around object literal property names
  'quote-props': ['warn', 'as-needed', {
    keywords: true,
    unnecessary: false,
    numbers: true
  }],

    // enforce the consistent use of either backticks, double, or single quotes
  'quotes': ['error', 'single'],

    // require JSDoc comments
  'require-jsdoc': ['off'],

    // enforce consistent spacing before and after semicolons
  'semi-spacing': ['error'],

    // require or disallow semicolons instead of ASI
  'semi': ['error'],

    // require object keys to be sorted
  'sort-keys': ['off'],

    // require variables within the same declaration block to be sorted
  'sort-vars': ['warn', { ignoreCase: false }],

    // enforce consistent spacing before blocks
  'space-before-blocks': ['error', 'always'],

    // enforce consistent spacing before function definition opening parenthesis
  'space-before-function-paren': ['error', {
    anonymous: 'never',
    named: 'never'
  }],

    // enforce consistent spacing inside parentheses
  'space-in-parens': ['error'],

    // require spacing around infix operators
  'space-infix-ops': ['error'],

    // enforce consistent spacing before or after unary operators
  'space-unary-ops': ['error'],

    // enforce consistent spacing after the // or /* in a comment
  'spaced-comment': ['warn', 'always'],

    // require or disallow Unicode byte order mark (BOM)
  'unicode-bom': ['error'],

    // require parenthesis around regex literals
  'wrap-regex': ['off']
} };
