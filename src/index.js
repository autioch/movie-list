const App = require('./app');
const filtersViewFactory = require('./filters/view');
const countViewFactory = require('./count/view');
const listViewFactory = require('./list/view');
const legendViewFactory = require('./legend/view');
const statsViewFactory = require('./stats/view');

const appInstance = new App();

const filtersView = filtersViewFactory(appInstance);
const listView = listViewFactory(appInstance);
const countView = countViewFactory(appInstance);
const legendView = legendViewFactory(appInstance);
const statsView = statsViewFactory(appInstance);

require('./style');
require('./favicon.ico');

const filters = document.querySelector('.filters');
const stats = document.querySelector('.stats');

document.body.insertBefore(listView.render(), stats);

filters.appendChild(filtersView.el);
stats.appendChild(countView.render());
stats.appendChild(statsView.render());
stats.appendChild(legendView.render());

window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 1), 0));

appInstance.fieldCallbacks.push(filtersView.render);
appInstance.addCallback(() => {
  countView.render();
  listView.render();
  statsView.render();
});
