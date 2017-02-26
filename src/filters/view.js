const dom = require('utils/dom');
const filterViewFactory = require('filters/types/view');

require('./style');

module.exports = function filtersViewFactory(appModel, el = dom('div', 'field-list')) {
  appModel
    .query()
    .fields
    .filter((field) => !field.hidden)
    .forEach((field) => el.appendChild(filterViewFactory(field).el));

  return { el };
};
