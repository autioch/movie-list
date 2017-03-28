const fieldsViewFactory = require('../fields/view');
const countViewFactory = require('../count/view');
const listViewFactory = require('../list/view');
const legendViewFactory = require('../legend/view');
const statsViewFactory = require('../stats/view');
const delve = require('utils/delve');

require('./style');

/**
 * Application view. Consists of smaller views.
 *
 * @param  {Object}    appModel Application  model.
 * @return {undefined}          Nothing.
 */
module.exports = function appViewFactory(appModel) {
  const bodyEl = document.body;
  const leftPanelEl = delve(bodyEl, 'left');
  const centerPanelEl = delve(bodyEl, 'center');
  const rightPanelEl = delve(bodyEl, 'right');

  const countView = countViewFactory(appModel);
  const statsView = statsViewFactory(appModel);
  const fieldsView = fieldsViewFactory(appModel);
  const legendView = legendViewFactory(appModel);
  const listView = listViewFactory(appModel, centerPanelEl);

  leftPanelEl.appendChild(fieldsView.el);
  rightPanelEl.appendChild(countView.el);
  rightPanelEl.appendChild(statsView.el);
  rightPanelEl.appendChild(legendView.el);

  appModel.onChange(() => {
    countView.update();
    listView.update();
    statsView.update();
    fieldsView.update();
  });
};
