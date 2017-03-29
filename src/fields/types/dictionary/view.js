const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const selectViewFactory = require('./selectView');
const { resetButton } = require('utils');

require('./style');

module.exports = function textViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const selectView = selectViewFactory(field, setFilterValue);

  el.appendChild(tag('div.field__filter', [
    selectView.el,
    resetButton(field.label, resetFilter)
  ]));

  function setFilterValue() {
    field.selectValue(selectView.el.value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    selectView.reset();
    syncFilter();
  }

  function update() {}

  return {
    el,
    update
  };
};
