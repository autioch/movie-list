const tag = require('lean-tag');
const { fragment } = require('utils');

module.exports = {
  header: (def, item) => tag('span.item__title.t-header', item[def.key]),
  warning(def, item) {
    const frag = fragment();

    /* Use fragment to avoid the need for flattening the arrays. */
    item[def.key].forEach((val) => frag.appendChild(tag('li.item-warning__item', val)));

    return frag;
  },
  content: (def, item) => tag('p.item__content', item[def.key]),
  details(def, item) {
    return tag('section.item-detail t-hint', [
      tag('header.item-detail__header', def.label),
      tag('ul.item-detail__list', item[def.key].map((detail) => tag('li.item-detail__list-item', detail)))
    ]);
  },
  summary(def, item) {
    const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
    const rankClassName = def.ranked ? `.t-rank__text--${item[`${def.key}Level`]}` : '';

    return tag(`li.item-summary__list-item${rankClassName}`, content);
  }
};
