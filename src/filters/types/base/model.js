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
  const label = key.replace(/\.?([A-Z]+)/g, (x, y) => ` ${y}`);

  return label[0].toUpperCase() + label.slice(1);
}

module.exports = function baseModelFactory(attributes, app) {
  const config = Object.assign({}, DEFAULTS, attributes);
  const label = getLabel(config.key);

  function hasSort() {
    return config.order !== ORDER.NONE;
  }

  function makeSort() {
    if (config.order === ORDER.ASC) {
      return resetSort();
    }
    invertSort();
  }

  function resetSort() {
    config.order = ORDER.NONE;
    app.removeSort(config.key);
  }

  function invertSort() {
    config.order = ORDER_INVERSION[config.order];
    app.addSort({
      key: config.key,
      order: config.order,
      orderInverse: ORDER_INVERSION[config.order],
      label
    });
  }

  return {
    config,
    hasSort,
    makeSort,
    label
  };
};
