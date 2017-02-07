const AbstractView = require('../abstract/view');
const template = require('./template.tpl');

require('./style');

module.exports = AbstractView.extend({ template });
