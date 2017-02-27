const factories = {
  '1': require('./text/model'),
  '2': require('./range/model'),
  '3': require('./dictionary/model'),
  '4': require('./date/model')
};

module.exports = function fieldModelFactory(field, appModel) {
  return factories[field.type](field, appModel);
};
