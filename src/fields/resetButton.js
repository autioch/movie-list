const tag = require('lean-tag');

/**
 * Creates as button.
 * @param  {String} label             Name of the field to reset.
 * @param  {Function} onClickCallback Function to be called on click.
 * @return {HTMLElement}              Created interactive element.
 */
module.exports = function resetButton(label, onClickCallback) {
  return tag('span.field__filter-reset.t-btn', {
    title: `Reset ${label} filter`,
    onclick: onClickCallback
  });
};
