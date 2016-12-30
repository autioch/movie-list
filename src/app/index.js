const applyFilters = require('./utils/applyFilters');
const applySorts = require('./utils/applySorts');
const parseVideo = require('./utils/parseVideo');

function App(videos, fields) {
  const parsedVideos = videos.map(parseVideo);

  this._videos = parsedVideos;
  this.videos = parsedVideos.slice(0);
  this.sorts = [];
  this.filters = [];
  this.fields = fields;
  this.onChangedVideos = [];
}

App.prototype = {
  setSort(sortProperty) {
    const currentSort = this.sorts.find((activeSort) => activeSort.property === sortProperty);

    if (currentSort) {
      currentSort.order *= -1;
    } else {
      this.sorts.push({
        property: sortProperty,
        order: 1
      });
    }
    this.syncVisibleVideos();
  },
  resetSort(sortProperty) {
    this.sorts = this.sorts.filter((activeSort) => activeSort.property !== sortProperty);
    this.syncVisibleVideos();
  },
  resetAllSorts() {
    this.sorts = [];
    this.syncVisibleVideos();
  },
  setFilter(filterProperty, filterText) {
    if (!filterText) {
      this.resetFilter(filterProperty);
    }
    let currentFilter = this.filters.find((activeFilter) => activeFilter.property === filterProperty);

    if (!currentFilter) {
      currentFilter = { property: filterProperty };
      this.filters.push(currentFilter);
    }

    /* Simple fuzzy search */
    currentFilter.value = new RegExp(filterText.split('').join('.?'), 'i');
    this.syncVisibleVideos();
  },
  resetFilter(filterProperty) {
    this.filters = this.filters.filter((activeFilter) => activeFilter.property !== filterProperty);
    this.syncVisibleVideos();
  },
  resetAllFilters() {
    this.sorts = [];
    this.syncVisibleVideos();
  },
  syncVisibleVideos() {
    const filteredVideos = applyFilters(this._videos, this.filters);
    const sortedVideos = applySorts(filteredVideos, this.sorts);

    this.videos = sortedVideos;

    this.onChangedVideos.forEach((changedVideoCallback) => changedVideoCallback());
  }
};

module.exports = App;
