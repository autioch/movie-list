const dom = require('utils/dom');
const empty = require('utils/empty');

require('./style');

module.exports = function statsViewFactory(app, el = dom('div', 'stat-list')) {
  function domStatItem(item) {
    return dom('li', 'stat__item', [
      dom('span', `stat-item__value t-value ${item.rounded ? 'is-rounded' : ''}`, item.value),
      dom('span', 'stat-item__label t-hint', item.key)
    ]);
  }

  function domStat(stat) {
    return dom('section', 'stat', [
      dom('header', 'stat__header t-header', stat.label),
      dom('ul', 'stat__item-list', stat.items.map(domStatItem))
    ]);
  }

  return {
    el,
    render() {
      empty(el);
      app.query().stats.map(domStat).forEach((statEl) => el.appendChild(statEl));

      return el;
    }
  };
};
