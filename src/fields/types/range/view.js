const baseViewFactory = require('../base/view');
const events = require('utils/events');
const tag = require('lean-tag');
const prop = require('utils/prop');
const debounce = require('utils/debounce');

const statMaxIndex = 3;
const statMinIndex = 5;

require('./style');

module.exports = function textViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const { label, fromValue, toValue } = field.query();

  const fromEl = tag('input.field-range__input.t-input');
  const toEl = tag('input.field-range__input.t-input');
  const resetEl = tag('span.field__filter-reset.t-btn');

  el.appendChild(tag('.field__filter', [
    tag('span.field-range__text.t-hint', 'From'),
    prop(fromEl, ['type', 'text', 'value', fromValue, 'title', `Set minimum ${label}`]),
    tag('span.field-range__text.t-hint', 'To'),
    prop(toEl, ['type', 'text', 'value', toValue, 'title', `Set maximum ${label}`]),
    prop(resetEl, ['title', `Reset ${label} filter`])
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

  events(fromEl, { keyup: debounce(setFromValue) });
  events(toEl, { keyup: debounce(setToValue) });
  events(resetEl, { click: resetFilter });

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
