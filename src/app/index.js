const applySorts = require('./applySorts');
const applyFilters = require('./applyFilters');
const Field = require('./field');

function App(videos, fieldNames) {
  this._videos = videos;
  this.fields = fieldNames.map((fieldName) => new Field(fieldName));
  this.videos = videos.slice(0);
  this.callbacks = [];
}

App.prototype = {
  constructor: App,
  resetFilters() {
    this.fields.forEach((field) => field.resetValue());
  },
  setVideos() {
    this.videos = applySorts(this.fields, applyFilters(this.fields, this._videos));
    this.callbacks.forEach((callback) => callback());
  },
  addCallback(callback) {
    this.callbacks.push(callback);
  }
};

module.exports = App;
