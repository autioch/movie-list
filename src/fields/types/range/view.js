const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const debounce = require('utils/debounce');

const statMaxIndex = 3;
const statMinIndex = 5;

require('./style');

module.exports = function textViewFactory(field) {
  const { el, syncFilter } = baseViewFactory(field);
  const { label, fromValue, toValue } = field.query();

  const fromEl = tag('input.field-range__input.t-input', {
    type: 'text',
    value: fromValue,
    title: `Set minimum ${label}`,
    onkeyup: debounce(setFromValue)
  });
  const toEl = tag('input.field-range__input.t-input', {
    type: 'text',
    value: toValue,
    title: `Set maximum ${label}`,
    onkeyup: debounce(setToValue)
  });

  el.appendChild(tag('.field__filter', [
    tag('span.field-range__text.t-hint', 'From'),
    fromEl,
    tag('span.field-range__text.t-hint', 'To'),
    toEl,
    tag('span.field__filter-reset.t-btn', {
      title: `Reset ${label} filter`,
      onclick: resetFilter
    })
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
