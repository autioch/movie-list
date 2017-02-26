const dom = require('utils/dom');
const prop = require('utils/prop');
const fragment = require('utils/fragment');

const getters = {
  header: (def, item) => dom('span', 'item__title t-header', item[def.key]),
  warning(def, item) {
    const value = item[def.key];
    const frag = fragment();

    /* Use fragment to avoid the need for flattening the arrays. */
    value.forEach((val) => frag.appendChild(dom('li', 'item-warning__item', val)));

    return frag;
  },
  content: (def, item) => dom('p', 'item__content', item[def.key]),
  details(def, item) {
    const value = item[def.key];

    return dom('section', 'item-detail t-hint', [
      dom('header', 'item-detail__header', def.label),
      dom('ul', 'item-detail__list', value.map((detail) => dom('li', 'item-detail__list-item', detail)))
    ]);
  },
  summary(def, item) {
    const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);

    return dom('li', def.ranked ? `item-summary__list-item t-rank__text--${item[`${def.key}Level`]}` : 'item-summary__list-item', content);
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

  return dom('span', 'item-warning', [
    dom('span', 'item-warning__icon t-warn', '?'),
    dom('ul', 'item-warning__list t-box', [dom('li', '', 'Info might be incorrect. Reasons:')].concat(warning))]
  );
}

function getLink(def, item) {
  const url = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
  const anchor = dom('a', 'item__link', prop(dom('img'), ['src', `/data/${def.key}.png`]));

  return prop(anchor, ['target', '_blank', 'title', `Search in ${def.label}`, 'href', url]);
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

  const headerContent = dom('header', 'item__header', header.concat(domWarning(warning)));
  const links = schema.links.filter((def) => !def.hidden).map((def) => getLink(def, item));

  item.__el = dom('section', 'item t-box', [
    dom('article', 'item__description', [headerContent].concat(content, details)),
    dom('aside', 'item-summary', dom('ul', 'item-summary__list', [dom('li', 'item-summary__list-item', links)].concat(summary)))
  ]);

  return item.__el;
};
