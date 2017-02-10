const { App, FieldListView, HeaderView, ItemListView, LegendView, StatsView } = require('./core');
const { Model, View, fields, data } = require('./movie');

require('./style');

const appInstance = new App(fields, Model);
const fieldListView = new FieldListView(appInstance);
const itemListView = new ItemListView(appInstance, View);
const headerView = new HeaderView(appInstance);
const legendView = new LegendView(appInstance);
const statsView = new StatsView(appInstance);

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

window
  .fetch(data)
  .then((response) => response.json())
  .then((items) => appInstance.setItems(items));
