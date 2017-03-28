/* eslint no-underscore-dangle: 0 */
const tag = require('lean-tag');
const fragment = require('utils/fragment');

const getters = {
  header: (def, item) => tag('span.item__title.t-header', item[def.key]),
  warning(def, item) {
    const value = item[def.key];
    const frag = fragment();

    /* Use fragment to avoid the need for flattening the arrays. */
    value.forEach((val) => frag.appendChild(tag('li.item-warning__item', val)));

    return frag;
  },
  content: (def, item) => tag('p.item__content', item[def.key]),
  details(def, item) {
    const value = item[def.key];

    return tag('section.item-detail t-hint', [
      tag('header.item-detail__header', def.label),
      tag('ul.item-detail__list', value.map((detail) => tag('li.item-detail__list-item', detail)))
    ]);
  },
  summary(def, item) {
    const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
    const rankClassName = def.ranked ? `.t-rank__text--${item[`${def.key}Level`]}` : '';

    return tag(`li.item-summary__list-item${rankClassName}`, content);
  }
};

function check(def, item) {
  if (def.hidden) {
    return false;
  }
  const value = item[def.key];

  return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
}

const getterKeys = Object.keys(getters);

function domWarning(warning) {
  if (!warning.length) {
    return [];
  }

  return tag('span.item-warning', [
    tag('span.item-warning__icon.t-warn', '?'),
    tag('ul.item-warning__list.t-box', tag('li', 'Info might be incorrect. Reasons:'), warning)]
  );
}

function getLink(def, item) {
  return tag('a.item__link', tag('img', { src: `/data/${def.key}.png` }), {
    target: '_blank',
    title: `Search in ${def.label}`,
    href: def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key])
  });
}

module.exports = function getItem(item, schema) {
  const el = item.__el;

  if (el) {
    return el;
  }

  const { header, warning, content, details, summary } = getterKeys.reduce((acc, key) => {
    acc[key] = schema[key].filter((def) => check(def, item)).map((def) => getters[key](def, item));

    return acc;
  }, {});

  const headerContent = tag('header.item__header', header.concat(domWarning(warning)));
  const links = schema.links.filter((def) => !def.hidden).map((def) => getLink(def, item));
  const summaryItems = [tag('li.item-summary__list-item', links)].concat(summary);

  item.__el = tag('section.item.t-box', [
    tag('article.item__description', [headerContent].concat(content, details)),
    tag('aside.item-summary', tag('ul.item-summary__list', summaryItems))
  ]);

  return item.__el;
};
