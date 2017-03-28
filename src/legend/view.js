const tag = require('lean-tag');

require('./style');

const levels = [-1, 0, 1, 2, 3, 4]; // eslint-disable-line no-magic-numbers

module.exports = function legendViewFactory() {
  const el = tag('section.legend', [
    tag('header.legend__header.t-header', 'Ranking'),
    tag('ul.legend__list', levels.map((level) => tag(`li.legend__item.t-rank__bg--${level}.t-hint`)))
  ]);

  return { el };
};
