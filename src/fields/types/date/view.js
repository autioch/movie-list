const baseViewFactory = require('../base/view');
const tag = require('lean-tag');
const debounce = require('utils/debounce');

require('./style');

module.exports = function dateViewFactory(field, el = tag('section.field')) {
  const { syncFilter } = baseViewFactory(field, el);
  const { label, fromDate, toDate } = field.query();

  const fromEl = tag('input.field-date__input.t-input', {
    type: 'text',
    value: fromDate,
    title: `Set minimum ${label}`,
    placeholder: '2016-12-31',
    onkeyup: debounce(setFromValue)
  });

  const toEl = tag('input.field-date__input.t-input', {
    type: 'text',
    value: toDate,
    title: `Set maximum ${label}`,
    placeholder: '2016-12-31',
    onkeyup: debounce(setToValue)
  });

  el.appendChild(tag('div.field__filter', [
    tag('span.field-date__text.t-hint', 'From'),
    fromEl,
    tag('span.field-date__text.t-hint', 'To'),
    toEl,
    tag('span.field__filter-reset.t-btn', {
      onclick: resetFilter,
      title: `Reset ${label} filter`
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

  function update() {}

  return {
    el,
    update
  };
};
