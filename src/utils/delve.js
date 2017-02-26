module.exports = function delve(el, selector) {
  return el.querySelector(`.js-${selector}`);
};
