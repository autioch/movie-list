/* Utility for clearing up elements non-recursive. */
module.exports = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  return el;
};
