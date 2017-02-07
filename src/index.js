const App = require('./app');
const ItemListView = require('./item/list/view');
const FieldListView = require('./field/list/view');
const HeaderView = require('./header/view');
const LegendView = require('./legend/view');

const fields = require('./fields');
const items = require('./data.json');

require('./style');

const appInstance = new App(fields);
const fieldListView = new FieldListView(appInstance);
const itemListView = new ItemListView(appInstance);
const headerView = new HeaderView(appInstance);
const legendView = new LegendView(appInstance);

itemListView.render();
fieldListView.render();
headerView.render();
legendView.render();

const sidebar = document.querySelector('.sidebar');

document.body.appendChild(itemListView.el);
sidebar.appendChild(headerView.el);
sidebar.appendChild(fieldListView.el);
sidebar.appendChild(legendView.el);

appInstance.setItems(items);
