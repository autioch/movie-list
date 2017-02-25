const dom = require('utils/dom');
const prop = require('utils/prop');

module.exports = function selectViewFactory(field, el = dom('select', 'field-dictionary__select t-input js-filter')) {
  prop(el, ['title', `Filter by ${field.label}`]);

  const { options, selected } = field.query();
  const optionsEls = [''].concat(options).map((option) => {
    const optionEl = dom('option', '', option);

    if (selected.indexOf(option) > -1) {
      prop(optionEl, [option.selected, true]);
    }

    return optionEl;
  });

  optionsEls.forEach((optionEl) => el.appendChild(optionEl));

  function render() {
    return el;
  }

  function reset() {
    optionsEls.forEach((optionEl) => {
      optionEl.selected = false;
    });
  }

  return {
    render,
    reset,
    el
  };
};
