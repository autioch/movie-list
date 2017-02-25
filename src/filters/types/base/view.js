const events = require('utils/events');
const dom = require('utils/dom');
const prop = require('utils/prop');

require('./style');

module.exports = function baseViewFactory(field, el = dom('section', 'field')) {
  const markerEl = dom('span', `field__sort-icon js-sort is-${field.config.order}`);
  const sortEl = dom('div', 'field__sort js-sort t-label', [dom('span', 'field__sort-text js-sort', field.label), markerEl]);

  el.appendChild(prop(sortEl, ['title', `Sort by ${field.label}`]));

  function syncSort() {
    el.classList.remove('is-sort-1');
    el.classList.remove('is-sort--1');
    if (field.hasSort()) {
      el.classList.add(`is-sort-${field.query().order}`);
    }
  }

  function setSort() {
    field.makeSort();
    syncSort();
  }

  function syncFilter() {
    if (field.hasValue()) {
      el.classList.add('is-filter-active');
    } else {
      el.classList.remove('is-filter-active');
    }
  }

  function render() {
    markerEl.className = `field__sort-icon js-sort is-${field.config.order}`;
    syncFilter();
    syncSort();

    return el;
  }

  events(el, { 'click sort': setSort });

  return {
    el,
    render,
    syncFilter
  };
};
