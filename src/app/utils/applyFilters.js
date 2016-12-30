function testVideo(video, activeFilter) {
  return activeFilter.value.test(video[activeFilter.property]);
}

module.exports = function applyFilters(videos, filters) {
  return filters.reduce((filtered, activeFilter) => filtered.filter((video) => testVideo(video, activeFilter)), videos);
};
