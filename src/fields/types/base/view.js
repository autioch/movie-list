const events = require('utils/events');
const dom = require('utils/dom');
const prop = require('utils/prop');

require('./style');

module.exports = function baseViewFactory(field, el = dom('section', 'field')) {
  const markerEl = dom('span', `field__sort-icon t-btn is-${field.config.order}`);
  const sortEl = dom('div', 'field__sort t-label', [dom('span', 'field__sort-text', field.label), markerEl]);

  events(sortEl, { click: setSort });
  prop(sortEl, ['title', `Sort by ${field.label}`]);

  el.appendChild(sortEl);

  function setSort() {
    field.makeSort();
    el.classList.remove('is-sort-1');
    el.classList.remove('is-sort--1');
    if (field.hasSort()) {
      el.classList.add(`is-sort-${field.query().order}`);
    }
  }

  function syncFilter() {
    if (field.hasValue()) {
      el.classList.add('is-filter-active');
    } else {
      el.classList.remove('is-filter-active');
    }
  }

  return {
    el,
    syncFilter
  };
};
