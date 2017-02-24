const BaseView = require('base/view');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  className: 'legend',
  tagName: 'section',
  template
});
