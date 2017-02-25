const baseViewFactory = require('../base/view');
const events = require('utils/events');
const dom = require('utils/dom');
const prop = require('utils/prop');

require('./style');

module.exports = function textViewFactory(field, el = dom('section', 'field')) {
  const { render, syncFilter } = baseViewFactory(field, el);
  const inputEl = dom('input', 'field-text__input t-input js-filter');
  const resetEl = dom('span', 'field__filter-reset t-btn js-reset');

  el.appendChild(dom('div', 'field__filter', [
    prop(inputEl, ['type', 'text', 'value', field.query().value, 'title', `Filter by ${field.label}`]),
    prop(resetEl, ['title', `Reset ${field.label} filter`])
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

  events(el, {
    'keyup filter': setFilter,
    'click reset': resetFilter
  });

  return {
    el,
    render
  };
};
