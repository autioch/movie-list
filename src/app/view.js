const filtersViewFactory = require('../filters/view');
const countViewFactory = require('../count/view');
const listViewFactory = require('../list/view');
const legendViewFactory = require('../legend/view');
const statsViewFactory = require('../stats/view');

require('./style');

module.exports = function viewFactory(appModel) {
  const filtersView = filtersViewFactory(appModel);
  const legendView = legendViewFactory(appModel);
  const countView = countViewFactory(appModel);
  const listView = listViewFactory(appModel, document.querySelector('.item-list'));
  const statsView = statsViewFactory(appModel);

  const stats = document.querySelector('.stats');

  listView.render();
  document.querySelector('.filters').appendChild(filtersView.render());
  stats.appendChild(countView.render());
  stats.appendChild(statsView.render());
  stats.appendChild(legendView.render());

  appModel.onChange(() => {
    countView.render();
    listView.render();
    statsView.render();
  });
};
