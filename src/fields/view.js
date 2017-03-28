const tag = require('lean-tag');
const fieldViewFactory = require('fields/types/view');

require('./style');

module.exports = function fieldsViewFactory(appModel, el = tag('.field-list')) {
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
