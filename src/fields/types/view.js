const factories = {
  '1': require('./text/view'),
  '2': require('./range/view'),
  '3': require('./dictionary/view'),
  '4': require('./date/view')
};

module.exports = function fieldViewFactory(field) {
  return factories[field.type];
};
