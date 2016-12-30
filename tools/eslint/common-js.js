module.exports = {
  rules: {

    // require return statements after callbacks
    'callback-return': ['error'],

    // require require() calls to be placed at top-level module scope
    'global-require': ['off'],

    // require error handling in callbacks
    'handle-callback-err': ['error'],

    // disallow require calls to be mixed with regular variable declarations
    'no-mixed-requires': ['error'],

    // disallow new operators with calls to require
    'no-new-require': ['error'],

    // disallow string concatenation with __dirname and __filename
    'no-path-concat': ['error'],

    // disallow the use of process.env
    'no-process-env': ['error'],

    // disallow the use of process.exit()
    'no-process-exit': ['error'],

    // disallow specified modules when loaded by require
    'no-restricted-modules': ['error'],

    // disallow synchronous methods
    'no-sync': ['warn']
  }
};
