const { App, FieldListView, CountView, ItemListView, LegendView, StatsView, SortsView } = require('./core');
const { Model, View, fields, data } = require('./movie');

const appInstance = new App(fields, Model);
const fieldListView = new FieldListView(appInstance);
const itemListView = new ItemListView(appInstance, View);
const countView = new CountView(appInstance);
const legendView = new LegendView(appInstance);
const statsView = new StatsView(appInstance);
const sortsView = new SortsView(appInstance);

require('./core/style');
require('./favicon.ico');

itemListView.render();
fieldListView.render();
countView.render();
legendView.render();
statsView.render();
sortsView.render();

const filters = document.querySelector('.filters');
const stats = document.querySelector('.stats');

document.body.insertBefore(itemListView.el, stats);

filters.appendChild(sortsView.el);
filters.appendChild(fieldListView.el);
stats.appendChild(countView.el);
stats.appendChild(statsView.el);
stats.appendChild(legendView.el);

/* For production config, data is separate file. For development, just the data. Avoids reloads on styles change. */
if (typeof data === 'string') {
  window
    .fetch(data)
    .then((response) => response.json())
    .then((items) => appInstance.setItems(items));
} else {
  appInstance.setItems(data);
}
