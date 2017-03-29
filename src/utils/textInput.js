const tag = require('lean-tag');
const debounce = require('./debounce');

function noop() {}

/**
 * Creates an input.
 * @param  {String} [title='']        Text displayed on hover.
 * @param  {String} [value='']        Initial value of the input.
 * @param  {Function} [callback=noop] Function to be called on change.
 * @param  {String} [className='']    Additional className to be added.
 * @param  {String} [placeholder='']  Placeholder for the input.
 * @return {HTMLElement}              Created HTMLElement
 */
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
