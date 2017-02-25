const baseViewFactory = require('../abstract/view');
const template = require('./template.tpl');
const bindEvents = require('bindEvents');
const createElement = require('createElement');

require('./style');

module.exports = function textViewFactory(field, el = createElement('field', 'section')) {
  const { render: baseRender, query, syncFilter } = baseViewFactory(field, el);

  function render() {
    el.innerHTML = template({ field });

    return baseRender();
  }

  function selectValue() {
    field.selectValue(query('filter').value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    render();
  }

  bindEvents(el, {
    'change filter': selectValue,
    'click reset': resetFilter
  });

  return {
    el,
    render
  };
};
