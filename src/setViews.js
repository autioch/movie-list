const { FieldListView, CountView, ItemListView, LegendView, StatsView } = require('./core');

module.exports = function setViews(appInstance) {
  const fieldListView = new FieldListView(appInstance);
  const itemListView = new ItemListView(appInstance);
  const countView = new CountView(appInstance);
  const legendView = new LegendView(appInstance);
  const statsView = new StatsView(appInstance);

  require('./core/style');
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
};
