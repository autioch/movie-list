const tag = require('lean-tag');

require('./style');

module.exports = function countViewFactory(appModel, el = tag('section.count')) {
  const visible = tag('header.count__visible.t-value');
  const filtered = tag('footer.count__filtered.t-hint');

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
