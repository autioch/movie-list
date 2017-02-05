const ListView = require('./list/view');
const ToolbarView = require('./toolbar/view');

require('./style');

module.exports = function view(app) {
  const toolbarView = new ToolbarView(app);
  const listView = new ListView(app);

  toolbarView.render();
  listView.render();

  document.body.appendChild(toolbarView.el);
  document.body.appendChild(listView.el);
};
