const prop = require('utils/prop');
const fragment = require('utils/fragment');
const tag = require('lean-tag');

module.exports = function selectViewFactory(field, el = tag('select.field-dictionary__select.t-input')) {
  prop(el, ['title', `Filter by ${field.label}`]);

  const { options, selected } = field.query();
  const frag = fragment();
  const optionsEls = [''].concat(options).map((option) => {
    const optionEl = tag('option', option);

    if (selected.indexOf(option) > -1) {
      prop(optionEl, [option.selected, true]);
    }
    frag.appendChild(optionEl);

    return optionEl;
  });

  el.appendChild(frag);

  function reset() {
    optionsEls.forEach((optionEl) => {
      optionEl.selected = false;
    });
  }

  return {
    reset,
    el
  };
};
