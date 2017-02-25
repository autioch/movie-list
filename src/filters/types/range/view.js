const baseViewFactory = require('../base/view');
const template = require('./template.tpl');
const bindEvents = require('bindEvents');
const createElement = require('createElement');

require('./style');

module.exports = function textViewFactory(field, el = createElement('field', 'section')) {
  const { render: baseRender, query, syncFilter } = baseViewFactory(field, el);

  function render() {
    el.innerHTML = template(field.query());

    return baseRender();
  }

  function setFromValue() {
    field.setFromValue(query('from').value);
    syncFilter();
  }

  function setToValue() {
    field.setToValue(query('to').value);
    syncFilter();
  }

  function resetFilter() {
    field.resetValue();
    render();
  }

  bindEvents(el, {
    'keyup from': setFromValue,
    'keyup to': setToValue,
    'click reset': resetFilter
  });

  return {
    el,
    render
  };
};
