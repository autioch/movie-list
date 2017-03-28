const tag = require('lean-tag');

module.exports = function statViewFactory(field) {
  const listEl = tag('ul.stat__item-list', getStatItems());

  const el = tag('section.stat', [
    tag('header.stat__header.t-header', field.label),
    listEl
  ]);

  function getStatItems() {
    return field.query().stats.map((item) => tag('li.stat__item', [
      tag(`span.stat-item__value.t-value${item.rounded ? '.is-rounded' : ''}`, item.value),
      tag('span.stat-item__label.t-hint', item.key)
    ]));
  }

  function update() {
    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }
    getStatItems().forEach((li) => listEl.appendChild(li));
  }

  return {
    el,
    update
  };
};
