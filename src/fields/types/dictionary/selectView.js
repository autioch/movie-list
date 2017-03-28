const tag = require('lean-tag');

function getOptionEls(field) {
  const { options, selected } = field.query();

  [''].concat(options).map((option) => {
    const optionEl = tag('option', option);

    if (selected.indexOf(option) > -1) {
      optionEl.selected = true;
    }

    return optionEl;
  });
}

module.exports = function selectViewFactory(field, changeCallback) {
  const optionsEls = getOptionEls(field);

  const el = tag('select.field-dictionary__select.t-input', optionsEls, {
    title: `Filter by ${field.label}`,
    onchange: changeCallback
  });

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
