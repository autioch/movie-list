const BaseView = require('base/view');
const template = require('./item.tpl');
const { getLink, getSummary, getDetail, getDescription, getHeader, getWarning } = require('./utils');

require('./style');

module.exports = BaseView.extend({
  className: 'item t-box',
  tagName: 'section',
  template,
  initialize(item, app) {
    this.item = item;
    this.app = app;
  },
  data() {
    const definition = this.app.schema;
    const links = definition.links.map((link) => getLink(link, this.item)).filter((def) => !!def);
    const summary = definition.summary.map((def) => getSummary(def, this.item)).filter((def) => !!def);
    const details = definition.details.map((def) => getDetail(def, this.item)).filter((def) => !!def);
    const description = definition.description.map((def) => getDescription(def, this.item)).filter((def) => !!def);
    const header = definition.header.map((def) => getHeader(def, this.item)).filter((def) => !!def);
    const warning = definition.warning.map((def) => getWarning(def, this.item)).filter((def) => !!def);

    return {
      links,
      summary,
      details,
      description,
      header,
      warning
    };
  }
});
