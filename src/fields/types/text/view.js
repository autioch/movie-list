const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const debounce = require('utils/debounce');

require('./style');

module.exports = function textViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const inputEl = tag('input.field-text__input.t-input', {
    onkeyup: debounce(setFilter),
    type: 'text',
    value: field.query().value,
    title: `Filter by ${field.label}`
  });
  const resetEl = tag('span.field__filter-reset.t-btn', {
    onclick: resetFilter,
    title: `Reset ${field.label} filter`
  });

  el.appendChild(tag('.field__filter', [
    inputEl,
    resetEl
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
