const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const debounce = require('utils/debounce');

require('./style');

module.exports = function textViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const inputEl = tag('input.field-text__input.t-input', {
    onkeyup: debounce(setFilter),
    type: 'text',
    value: field.query().value,
    title: `Filter by ${field.label}`
  });

  el.appendChild(tag('.field__filter', [
    inputEl,
    tag('span.field__filter-reset.t-btn', {
      onclick: resetFilter,
      title: `Reset ${field.label} filter`
    })
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

  function update() {}

  return {
    el,
    update
  };
};
