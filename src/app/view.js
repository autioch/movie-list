const filtersViewFactory = require('../filters/view');
const countViewFactory = require('../count/view');
const listViewFactory = require('../list/view');
const legendViewFactory = require('../legend/view');
const statsViewFactory = require('../stats/view');

require('./style');

/**
 * Application view. Consists of smaller views.
 *
 * @param  {Object}    appModel Application  model.
 * @return {undefined}          Nothing.
 */
module.exports = function viewFactory(appModel) {
  const countView = countViewFactory(appModel);
  const listView = listViewFactory(appModel, document.querySelector('.item-list'));
  const statsView = statsViewFactory(appModel);
  const stats = document.querySelector('.stats');

  document.querySelector('.filters').appendChild(filtersViewFactory(appModel).el);
  stats.appendChild(countView.el);
  stats.appendChild(statsView.el);
  stats.appendChild(legendViewFactory(appModel).el);

  appModel.onChange(() => {
    countView.update();
    listView.update();
    statsView.update();
  });
};
