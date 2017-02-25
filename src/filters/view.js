const dom = require('utils/dom');
const filterViewFactory = require('filters/types/view');

require('./style');

module.exports = function filtersViewFactory(app, el = dom('div', 'field-list')) {
  const fragment = document.createDocumentFragment();

  app.query().fields
    .filter((field) => !field.hidden)
    .forEach((field) => fragment.appendChild(filterViewFactory(field).render()));

  el.appendChild(fragment);

  function render() {
    return el;
  }

  return {
    el,
    render
  };
};
