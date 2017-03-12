const PAIR = 2;

/**
 * Sets properties (not attributes) on the given el.
 * @param  {HTMLElement} el    Element to recieve properties.
 * @param  {Array} pairs       Even length array, where odds contain keys, and evens contain their values.
 * @return {HTMLElement}       Element paased as an argument.
 */
module.exports = function prop(el, pairs) {
  for (let index = 0; index < pairs.length; index += PAIR) {
    /* If this crashes, most probably odd length of pairs array. */
    el[pairs[index]] = pairs[index + 1];
  }

  return el;
};
