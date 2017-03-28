const tag = require('lean-tag');

require('./style');

const levelCount = 5;

module.exports = function legendViewFactory(appModel, el = tag('section.legend')) {
  const levels = [];

  for (let index = levelCount; index > -1; index--) {
    levels.push(tag(`li.legend__item.t-rank__bg--${index}.t-hint`));
  }

  const header = tag('header.legend__header.t-header', 'Ranking');
  const list = tag('ul.legend__list', levels);

  el.appendChild(header);
  el.appendChild(list);

  return { el };
};
