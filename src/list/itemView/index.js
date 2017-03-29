const tag = require('lean-tag');
const getters = require('./getters');
const check = require('./check');
const getWarnings = require('./getWarnings');
const getLinks = require('./getLinks');

require('./style');

const getterKeys = Object.keys(getters);

module.exports = function itemViewFactory(item, schema) {
  const links = getLinks(item, schema);
  const { header, warning, content, details, summary } = getterKeys.reduce((acc, key) => {
    acc[key] = schema[key].filter((def) => check(def, item)).map((def) => getters[key](def, item));

    return acc;
  }, {});

  return tag('section.item.t-box', [
    tag('article.item__description', tag('header.item__header', header, getWarnings(warning)), content, details),
    tag('aside.item-summary', tag('ul.item-summary__list', tag('li.item-summary__list-item', links), summary))
  ]);
};
