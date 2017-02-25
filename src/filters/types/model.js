const factories = {
  '1': require('./text/model'),
  '2': require('./range/model'),
  '3': require('./dictionary/model')
};

module.exports = function filterModelFactory(field, app) {
  return factories[field.type](field, app);
};
