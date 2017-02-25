const bindEvents = require('bindEvents');
const createElement = require('createElement');

require('./style');

module.exports = function baseViewFactory(field, el = createElement('field', 'section')) {
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
    requestAnimationFrame(() => {
      syncFilter();
      syncSort();
    });

    return el;
  }

  function query(selector) {
    return el.querySelector(`.js-${selector}`);
  }

  bindEvents(el, { 'click sort': setSort });

  return {
    el,
    render,
    query,
    syncFilter
  };
};
