const lodashTemplate = require('lodash.template');

module.exports = function tplCustomLoader(source) {
  return `var _ = require('lodash.template');\nmodule.exports = ${lodashTemplate(source)}`;
};
