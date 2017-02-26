const factories = {
  '1': require('./text/view'),
  '2': require('./range/view'),
  '3': require('./dictionary/view')
};

module.exports = function filterViewFactory(field, appModel) {
  return factories[field.type](field, appModel);
};
