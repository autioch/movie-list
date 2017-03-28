const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const selectViewFactory = require('./selectView');

require('./style');

module.exports = function textViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const selectView = selectViewFactory(field, setFilterValue);
  const resetEl = tag('span.field__filter-reset.t-btn', {
    title: `Reset ${field.label} filter`,
    onclick: resetFilter
  });

  selectView.el.onchange = setFilterValue;

  el.appendChild(tag('div.field__filter', selectView.el, resetEl));

  function setFilterValue() {
    field.selectValue(selectView.el.value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    selectView.reset();
    syncFilter();
  }

  function update() {

  }

  return {
    el,
    update
  };
};
