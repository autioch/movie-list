const _ = require('lodash');
const itemTemplate = require('./item/template.tpl');
const renderDelay = 500;
const $ = require('jquery');

require('./item/style');
require('./style');

function List(app) {
  this.app = app;
  this.el = document.createElement('div');
  this.$el = $(this.el);
  this.el.className = 'm-list';
  this.app.onChangedVideos.push(_.debounce(this.render.bind(this), renderDelay));
}

List.prototype = {
  render() {
    const fragment = document.createElement('div');

    this.app.videos.forEach((video) => {
      fragment.insertAdjacentHTML('beforeend', itemTemplate({ video }));
    });

    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    while (fragment.childNodes.length > 0) {
      this.el.appendChild(fragment.childNodes[0]);
    }
  },
  remove() {
    //
  }
};

module.exports = List;
