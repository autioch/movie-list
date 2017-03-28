const baseViewFactory = require('../base/view');
const events = require('utils/events');
const tag = require('lean-tag');
const prop = require('utils/prop');
const debounce = require('utils/debounce');

require('./style');

module.exports = function textViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const inputEl = tag('input.field-text__input.t-input');
  const resetEl = tag('span.field__filter-reset.t-btn');

  prop(inputEl, ['type', 'text', 'value', field.query().value, 'title', `Filter by ${field.label}`]);
  prop(resetEl, ['title', `Reset ${field.label} filter`]);

  el.appendChild(tag('.field__filter', [
    events(inputEl, { keyup: debounce(setFilter) }),
    events(resetEl, { click: resetFilter })
  ]));

  function setFilter() {
    field.setValue(inputEl.value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    inputEl.value = '';
    syncFilter();
  }

  function update() {

  }

  return {
    el,
    update
  };
};
