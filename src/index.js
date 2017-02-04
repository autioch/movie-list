const App = require('./app');
const ListView = require('./list');
const ToolbarView = require('./toolbar');
const HeaderView = require('./header');
const { FIELDS } = require('./app/config');
const $ = require('jquery');
const videos = require('./data.json');

require('./style');

const app = new App(videos, FIELDS);
const listView = new ListView(app);
const toolbarView = new ToolbarView(app);
const headerView = new HeaderView(app);

document.body.appendChild(toolbarView.el);
const applicationBar = document.querySelector('.application__bar');

applicationBar.appendChild(headerView.el);
applicationBar.appendChild(toolbarView.el);
document.body.appendChild(listView.el);

headerView.render();
toolbarView.render();
listView.render();

listView.$el.css('margin-top', $(applicationBar).outerHeight());
