const dom = require('utils/dom');

require('./style');

module.exports = function countViewFactory(app, el = dom('div', 'stat-list')) {
  const visible = dom('header', 'count__visible t-value');
  const filtered = dom('footer', 'count__filtered t-hint');

  el.appendChild(visible);
  el.appendChild(filtered);

  return {
    el,
    render() {
      const { count, totalCount } = app.query();

      visible.textContent = `${count} items`;
      filtered.textContent = `${totalCount - count} filtered out`;

      return el;
    }
  };
};
