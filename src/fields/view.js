const dom = require('utils/dom');
const fieldViewFactory = require('fields/types/view');

require('./style');

module.exports = function fieldsViewFactory(appModel, el = dom('div', 'field-list')) {
  const fieldViews = appModel
    .query()
    .fields
    .filter((field) => !field.config.hidden)
    .map((field) => fieldViewFactory(field));

  fieldViews.forEach((fieldView) => el.appendChild(fieldView.el));

  function update() {
    fieldViews.forEach((fieldView) => fieldView.update());
  }

  return {
    el,
    update
  };
};
