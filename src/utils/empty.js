module.exports = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  return el;
};
