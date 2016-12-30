module.exports = function applySorts(videos, sorts) {
  let index;
  let current;
  const count = sorts.length;
  let property;

  return videos.sort((video1, video2) => {
    for (index = 0; index < count; index++) {
      current = sorts[index];
      property = current.property;
      if (!video1[property] || !video2[property]) {
        continue;
      }
      if (video1[property] < video2[property]) {
        return current.order;
      }
      if (video1[property] > video2[property]) {
        return current.order * -1;
      }
    }

    return 0;
  });
};
