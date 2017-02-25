const template = require('./item.tpl');
const createElement = require('createElement');

const templateRegex = /#\{([^}]+)\}/g;

function getLink(link, item) {
  templateRegex.lastIndex = 0;
  const content = link.template.replace(templateRegex, (match, prop) => item[prop]);

  return `<a class="portal__link" target="_blank" title="Search in ${link.label}" href="${content}"><img src="/data/${link.key}.png" /></a>`;
}

function getSummary(def, item) {
  const value = item[def.key];

  if (value === null || value === undefined) {
    return null;
  }
  const content = Array.isArray(value) ? value.join(', ') : value;

  return `<footer class="item__detail t-hint"><span>${def.label}: </span><span class="item__detail-content">${content}</span></footer>`;
}

function getDetail(def, item) {
  const value = item[def.key];

  if (value === null || value === undefined) {
    return null;
  }
  templateRegex.lastIndex = 0;
  const content = def.template.replace(templateRegex, (match, prop) => item[prop]);
  const attribute = def.ranked ? ` class="t-rank__text--${item[`${def.key}Level`]}"` : '';

  return `<span${attribute}>${content}</span>`;
}

function getDescription(def, item) {
  const value = item[def.key];

  if (value === null || value === undefined) {
    return null;
  }

  return `<p class="item__description">${value}</p>`;
}

function getHeader(def, item) {
  const value = item[def.key];

  if (value === null || value === undefined) {
    return null;
  }

  return `<span class="item__title t-header">${value}</span>`;
}

function getWarning(def, item) {
  const value = item[def.key];

  if (value === null || value === undefined) {
    return null;
  }

  const items = Array.isArray(value) ? value : [value];

  return items.map((valueItem) => `<li class="item__warning-item">${valueItem}</li>`).join('');
}

module.exports = function getItem(item, schema) {
  let el = item.__el;

  if (!el) {
    el = createElement('item t-box', 'section');

    const links = schema.links.map((link) => getLink(link, item)).filter((def) => !!def).join('');
    const summary = schema.summary.map((def) => getSummary(def, item)).filter((def) => !!def).join('');
    const details = schema.details.map((def) => getDetail(def, item)).filter((def) => !!def).join('');
    const description = schema.description.map((def) => getDescription(def, item)).filter((def) => !!def).join('');
    const header = schema.header.map((def) => getHeader(def, item)).filter((def) => !!def).join('');
    const warning = schema.warning.map((def) => getWarning(def, item)).filter((def) => !!def).join('');

    el.innerHTML = template({
      links,
      summary,
      details,
      description,
      header,
      warning
    });
    item.__el = el;
  }

  return el;
};
