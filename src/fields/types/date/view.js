const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const { resetButton, textInput } = require('utils');

require('./style');

module.exports = function dateViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const { label, fromDate, toDate } = field.query();

  const fromEl = textInput({
    className: '.field-date__input',
    value: fromDate,
    title: `Set minimum ${label}`,
    placeholder: '2016-12-31',
    callback: setFromValue
  });

  const toEl = textInput({
    className: '.field-date__input',
    value: toDate,
    title: `Set maximum ${label}`,
    placeholder: '2016-12-31',
    callback: setToValue
  });

  el.appendChild(tag('div.field__filter', [
    tag('span.field-date__text.t-hint', 'From'),
    fromEl,
    tag('span.field-date__text.t-hint', 'To'),
    toEl,
    resetButton(label, resetFilter)
  ]));

  function setFromValue() {
    field.setFromValue(fromEl.value);
    syncFilter();
  }

  function setToValue() {
    field.setToValue(toEl.value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    fromEl.value = '';
    toEl.value = '';
    syncFilter();
  }

  function update() {}

  return {
    el,
    update
  };
};
