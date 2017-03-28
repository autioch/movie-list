const baseViewFactory = require('../base/view');
const prop = require('utils/prop');
const events = require('utils/events');
const tag = require('lean-tag');
const selectViewFactory = require('./selectView');

require('./style');

module.exports = function textViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const selectView = selectViewFactory(field);
  const resetEl = tag('span.field__filter-reset.t-btn');

  prop(resetEl, ['title', `Reset ${field.label} filter`]);
  events(resetEl, { click: resetFilter });
  events(selectView.el, { change: setFilterValue });

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
