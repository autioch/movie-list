const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const { resetButton, textInput } = require('utils');

const statMaxIndex = 3;
const statMinIndex = 5;

require('./style');

module.exports = function textViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const { label, fromValue, toValue } = field.query();

  const fromEl = textInput({
    className: '.field-range__input',
    value: fromValue,
    title: `Set minimum ${label}`,
    callback: setFromValue
  });

  const toEl = textInput({
    className: '.field-range__input',
    value: toValue,
    title: `Set maximum ${label}`,
    callback: setToValue
  });

  el.appendChild(tag('.field__filter', [
    tag('span.field-range__text.t-hint', 'From'),
    fromEl,
    tag('span.field-range__text.t-hint', 'To'),
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

  function update() {
    const { stats } = field.query();

    fromEl.placeholder = stats[statMinIndex].value;
    toEl.placeholder = stats[statMaxIndex].value;
  }

  update();

  return {
    el,
    update
  };
};
