const tag = require('lean-tag');

require('./style');

module.exports = function baseViewFactory(field) {
  const el = tag('section.field', [
    tag('div.field__sort.t-label', [
      tag('span.field__sort-text', field.label),
      tag(`span.field__sort-icon.t-btn.is-${field.config.order}`)
    ], {
      onclick: setSort,
      title: `Sort by ${field.label}`
    })
  ]);

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
