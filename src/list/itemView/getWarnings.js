const tag = require('lean-tag');

module.exports = function getWarnings(warning) {
  if (!warning.length) {
    return [];
  }

  return tag('span.item-warning', [
    tag('span.item-warning__icon.t-warn', '?'),
    tag('ul.item-warning__list.t-box', tag('li', 'Info might be incorrect. Reasons:'), warning)]
  );
};
