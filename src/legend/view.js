const dom = require('utils/dom');

require('./style');

const levelCount = 5;

module.exports = function legendViewFactory(appModel, el = dom('section', 'legend')) {
  const levels = [];

  for (let index = levelCount; index > -1; index--) {
    levels.push(dom('li', `legend__item t-rank__bg--${index} t-hint`));
  }

  const header = dom('header', 'legend__header t-header', 'Ranking');
  const list = dom('ul', 'legend__list', levels);

  el.appendChild(header);
  el.appendChild(list);

  return { el };
};
