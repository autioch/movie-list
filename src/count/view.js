const dom = require('utils/dom');

require('./style');

module.exports = function countViewFactory(appModel, el = dom('div', 'stat-list')) {
  const visible = dom('header', 'count__visible t-value');
  const filtered = dom('footer', 'count__filtered t-hint');

  el.appendChild(visible);
  el.appendChild(filtered);

  function update() {
    const { count, totalCount } = appModel.query();

    visible.textContent = `${count} items`;
    filtered.textContent = `${totalCount - count} filtered out`;
  }

  update();

  return {
    el,
    update
  };
};
