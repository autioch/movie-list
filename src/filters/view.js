const Types = require('./types');
const createElement = require('createElement');

require('./style');

module.exports = function filtersViewFactory(app, el = createElement('field-list')) {
  function render() {
    const fragment = document.createDocumentFragment();

    app.fields.filter((field) => !field.hidden).forEach((field) => {
      const itemView = Types[field.type].viewFactory(field);

      itemView.render();
      fragment.appendChild(itemView.el);
    });

    el.appendChild(fragment);

    return el;
  }

  return {
    el,
    render
  };
};
