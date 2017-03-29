const tag = require('lean-tag');

module.exports = function getLinks(item, schema) {
  return schema.links
    .filter((def) => !def.hidden)
    .map((def) => tag('a.item__link', tag('img', { src: `/data/${def.key}.png` }), {
      target: '_blank',
      title: `Search in ${def.label}`,
      href: def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key])
    }));
};
