const dom = require('utils/dom');
const prop = require('utils/prop');

const getters = {
  header: (def, item) => dom('span', 'item__title t-header', item[def.key]),
  content: (def, item) => dom('p', 'item__content', item[def.key]),
  summary(def, item) {
    const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);

    return dom('span', def.ranked ? `t-rank__text--${item[`${def.key}Level`]}` : '', content);
  },
  details(def, item) {
    const value = item[def.key];

    return dom('footer', 'item__detail t-hint', [
      dom('span', '', `${def.label}: `),
      dom('span', 'item__detail-content', Array.isArray(value) ? value.join(', ') : value)
    ]);
  },
  warning(def, item) {
    const value = item[def.key];
    const content = Array.isArray(value) ? value : [value];
    const fragment = document.createDocumentFragment();

    content.forEach((val) => fragment.appendChild(dom('li', 'item__warning-item', val)));

    return fragment;
  }
};

function check(def, item) {
  const value = item[def.key];

  return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
}

const getterKeys = Object.keys(getters);

function domWarning(warning) {
  if (!warning.length) {
    return [];
  }

  return dom('span', 'item__warning', [
    dom('span', 'item__warning-icon t-warn', '?'),
    dom('ul', 'item__warning-list t-box', [dom('li', '', 'Info might be incorrect. Reasons:')].concat(warning))]
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
  const links = schema.links.map((def) => getLink(def, item));

  item.__el = dom('section', 'item t-box', [
    dom('article', 'item__description', [headerContent].concat(content, details)),
    dom('aside', 'item__summary', [dom('span', '', links)].concat(summary))
  ]);

  return item.__el;
};
