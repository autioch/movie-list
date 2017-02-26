const dom = require('utils/dom');
const fieldViewFactory = require('fields/types/view');

require('./style');

module.exports = function fieldsViewFactory(appModel, el = dom('div', 'field-list')) {
  appModel
    .query()
    .fields
    .filter((field) => !field.config.hidden)
    .forEach((field) => el.appendChild(fieldViewFactory(field).el));

  return { el };
};
