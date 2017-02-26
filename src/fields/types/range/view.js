const baseViewFactory = require('../base/view');
const events = require('utils/events');
const dom = require('utils/dom');
const prop = require('utils/prop');
const debounce = require('utils/debounce');

require('./style');

module.exports = function textViewFactory(field, el = dom('section', 'field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const { label, fromValue, toValue } = field.query();

  const fromEl = dom('input', 'field-range__input t-input');
  const toEl = dom('input', 'field-range__input t-input');
  const resetEl = dom('span', 'field__filter-reset t-btn');

  el.appendChild(dom('div', 'field__filter', [
    dom('span', 'field-range__text t-hint', 'From'),
    prop(fromEl, ['type', 'text', 'value', fromValue, 'title', `Set minimum ${label}`]),
    dom('span', 'field-range__text t-hint', 'To'),
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

  return { el };
};
