const $ = require('jquery');

require('./style');

function List(app) {
  this.app = app;
  this.el = document.createElement('div');
  this.el.className = 'm-header';
  this.$el = $(this.el);
  this.app.onChangedVideos.push(this.render.bind(this));
}

List.prototype = {
  render() {
    this.$el.html(`${this.app.videos.length} videos`);
  },
  remove() {
    this.$el.remove();
  }
};

module.exports = List;
