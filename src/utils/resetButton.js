const tag = require('lean-tag');

module.exports = function resetButton(label, onClickCallback) {
  return tag('span.field__filter-reset.t-btn', {
    title: `Reset ${label} filter`,
    onclick: onClickCallback
  });
};
