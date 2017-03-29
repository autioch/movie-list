const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const { resetButton, textInput } = require('utils');

require('./style');

module.exports = function textViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const inputEl = textInput({
    className: '.field-text__input',
    value: field.query().value,
    title: `Reset ${field.label} filter`,
    callback: setFilter
  });

  el.appendChild(tag('.field__filter', [
    inputEl,
    resetButton(field.label, resetFilter)
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
