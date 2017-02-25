const baseViewFactory = require('../base/view');
const template = require('./template.tpl');
const bindEvents = require('utils/bindEvents');
const createElement = require('utils/createElement');

require('./style');

module.exports = function textViewFactory(field, el = createElement('field', 'section')) {
  const { render: baseRender, query, syncFilter } = baseViewFactory(field, el);

  function render() {
    el.innerHTML = template(field.query());

    return baseRender();
  }

  function setFilter() {
    field.setValue(query('filter').value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    render();
  }

  bindEvents(el, {
    'keyup filter': setFilter,
    'click reset': resetFilter
  });

  return {
    el,
    render
  };
};
