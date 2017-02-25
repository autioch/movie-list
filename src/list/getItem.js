const template = require('./item.tpl');
const createElement = require('utils/createElement');

const getters = {
  links(def, item) {
    const url = def.template.replace(/#\{([^}]+)\}/g, (match, prop) => item[prop]);

    return `<a class="item__link" target="_blank" title="Search in ${def.label}" href="${url}"><img src="/data/${def.key}.png" /></a>`;
  },
  details(def, item) {
    const value = item[def.key];
    const content = Array.isArray(value) ? value.join(', ') : value;

    return `<footer class="item__detail t-hint"><span>${def.label}: </span><span class="item__detail-content">${content}</span></footer>`;
  },
  summary(def, item) {
    const content = def.template.replace(/#\{([^}]+)\}/g, (match, prop) => item[prop]);
    const attribute = def.ranked ? ` class="t-rank__text--${item[`${def.key}Level`]}"` : '';

    return `<span${attribute}>${content}</span>`;
  },
  warning(def, item) {
    const value = item[def.key];
    const content = Array.isArray(value) ? value : [value];

    return content.map((val) => `<li class="item__warning-item">${val}</li>`);
  },
  content: (def, item) => `<p class="item__content">${item[def.key]}</p>`,
  header: (def, item) => `<span class="item__title t-header">${item[def.key]}</span>`
};

function check(def, item) {
  const value = item[def.key];

  return value !== null && value !== undefined && value !== '';
}

const getterKeys = Object.keys(getters);

module.exports = function getItem(item, schema) {
  let el = item.__el;

  if (!el) {
    el = createElement('item t-box', 'section');

    el.innerHTML = template(getterKeys.reduce((acc, key) => {
      acc[key] = schema[key].filter((def) => check(def, item)).map((def) => getters[key](def, item)).join('');

      return acc;
    }, {}));
    item.__el = el;
  }

  return el;
};
