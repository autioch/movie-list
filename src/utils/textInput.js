const tag = require('lean-tag');
const debounce = require('./debounce');

function noop() {}

module.exports = function textInput({
  title = '',
  value = '',
  callback = noop,
  className = '',
  placeholder = ''
}) {
  return tag(`input.t-input${className}`, {
    onkeyup: debounce(callback),
    type: 'text',
    value,
    title,
    placeholder
  });
};
