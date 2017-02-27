const baseViewFactory = require('../base/view');
const events = require('utils/events');
const dom = require('utils/dom');
const prop = require('utils/prop');
const debounce = require('utils/debounce');

require('./style');

module.exports = function dateViewFactory(field, el = dom('section', 'field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const { label, fromDate, toDate } = field.query();

  const fromEl = dom('input', 'field-date__input t-input');
  const toEl = dom('input', 'field-date__input t-input');
  const resetEl = dom('span', 'field__filter-reset t-btn');

  el.appendChild(dom('div', 'field__filter', [
    dom('span', 'field-date__text t-hint', 'From'),
    prop(fromEl, ['type', 'text', 'value', fromDate, 'title', `Set minimum ${label}`, 'placeholder', '2016-12-31']),
    dom('span', 'field-date__text t-hint', 'To'),
    prop(toEl, ['type', 'text', 'value', toDate, 'title', `Set maximum ${label}`, 'placeholder', '2016-12-31']),
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
    // const { stats } = field.query();

    // fromEl.placeholder = stats[5].value;
    // toEl.placeholder = stats[3].value;
  }

  update();

  return {
    el,
    update
  };
};
