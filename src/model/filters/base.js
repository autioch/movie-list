const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
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

export default function baseModelFactory(attributes) {
  const config = Object.assign({}, DEFAULTS, attributes);
  const label = getLabel(config.key);

  config.id = config.key;

  return {
    config,
    label
  };
}
