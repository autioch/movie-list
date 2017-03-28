const tag = require('lean-tag');
const statViewFactory = require('./statView');

require('./style');

module.exports = function statsViewFactory(appModel, el = tag('section.stat-list')) {
  const statViews = appModel.query().fields.filter((field) => field.stat).map((field) => statViewFactory(field));

  statViews.forEach((statView) => el.appendChild(statView.el));

  function update() {
    statViews.forEach((statView) => statView.update());
  }

  return {
    el,
    update
  };
};
