const tag = require('lean-tag');
const statViewFactory = require('./statView');

require('./style');

module.exports = function statsViewFactory(appModel) {
  const statViews = appModel.query().fields.filter((field) => field.stat).map((field) => statViewFactory(field));
  const el = tag('section.stat-list', statViews.map((statView) => statView.el));

  function update() {
    statViews.forEach((statView) => statView.update());
  }

  return {
    el,
    update
  };
};
