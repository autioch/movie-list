const dom = require('utils/dom');
const statViewFactory = require('./statView');

require('./style');

module.exports = function statsViewFactory(appModel, el = dom('section', 'stat-list')) {
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
