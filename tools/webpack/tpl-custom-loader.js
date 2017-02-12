const template = require('lodash.template');

const PREFIX = 'module.exports = ';

const REGEXES = [{
  test: /(\t|\r\n|\r|\n) */gm,
  result: ''
}, {
  test: / +/gm,
  result: ' '
}, {
  test: /<% %>/gm,
  result: ''
}];

const reducer = (text, regex) => text.replace(regex.test, regex.result);

module.exports = function tplCustomLoader(source) {
  this.cacheable();

  return PREFIX + template(REGEXES.reduce(reducer, source)).toString();
};
