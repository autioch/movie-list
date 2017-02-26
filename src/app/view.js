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
module.exports = function viewFactory(appModel) {
  const countView = countViewFactory(appModel);
  const listView = listViewFactory(appModel, delve(document, 'center'));
  const statsView = statsViewFactory(appModel);
  const rightEl = delve(document, 'right');

  delve(document, 'left').appendChild(fieldsViewFactory(appModel).el);
  rightEl.appendChild(countView.el);
  rightEl.appendChild(statsView.el);
  rightEl.appendChild(legendViewFactory(appModel).el);

  appModel.onChange(() => {
    countView.update();
    listView.update();
    statsView.update();
  });
};
