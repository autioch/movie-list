const App = require('./app');
const ItemListView = require('./item/list/view');
const FieldListView = require('./field/list/view');
const HeaderView = require('./header/view');
const LegendView = require('./legend/view');
const StatsView = require('./stats/view');

const fields = require('./fields');
const items = require('./data.json');

require('./style');

const appInstance = new App(fields);
const fieldListView = new FieldListView(appInstance);
const itemListView = new ItemListView(appInstance);
const headerView = new HeaderView(appInstance);
const legendView = new LegendView(appInstance);
const statsView = new StatsView(appInstance);

// window.addEventListener('contextmenu', (ev) => ev.preventDefault(), false);

itemListView.render();
fieldListView.render();
headerView.render();
legendView.render();
statsView.render();

const filters = document.querySelector('.filters');
const stats = document.querySelector('.stats');

document.body.insertBefore(itemListView.el, stats);

filters.appendChild(fieldListView.el);
stats.appendChild(headerView.el);
stats.appendChild(legendView.el);
stats.appendChild(statsView.el);

appInstance.setItems(items);
