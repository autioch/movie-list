const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

const ORDER_INVERSION = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.DESC
};

const DEFAULTS = {
  key: '',
  type: 1,
  order: ORDER.NONE
};

function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}

module.exports = function baseModelFactory(attributes, appModel) {
  const config = Object.assign({}, DEFAULTS, attributes);
  const label = getLabel(config.key);

  function hasSort() {
    return config.order !== ORDER.NONE;
  }

  function resetSort() {
    config.order = ORDER.NONE;
    appModel.removeSort(config.key);
  }

  function invertSort() {
    config.order = ORDER_INVERSION[config.order];
    appModel.addSort({
      key: config.key,
      order: config.order,
      orderInverse: ORDER_INVERSION[config.order],
      label
    });
  }

  function makeSort() {
    if (config.order === ORDER.ASC) {
      resetSort();
    } else {
      invertSort();
    }
  }

  return {
    config,
    hasSort,
    makeSort,
    label
  };
};
