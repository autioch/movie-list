const App = require('./app');
const FieldListView = require('./field/listView');
const CountView = require('./count/view');
const ItemListView = require('./item/listView');
const LegendView = require('./legend/view');
const StatsView = require('./stats/view');

const appInstance = new App();

const fieldListView = new FieldListView(appInstance);
const itemListView = new ItemListView(appInstance);
const countView = new CountView(appInstance);
const legendView = new LegendView(appInstance);
const statsView = new StatsView(appInstance);

require('./style');
require('./favicon.ico');

itemListView.render();
countView.render();
legendView.render();
statsView.render();

const filters = document.querySelector('.filters');
const stats = document.querySelector('.stats');

document.body.insertBefore(itemListView.el, stats);

filters.appendChild(fieldListView.el);
stats.appendChild(countView.el);
stats.appendChild(statsView.el);
stats.appendChild(legendView.el);

window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 1), 0));
