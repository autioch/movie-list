const PAIR = 2;

/**
 * Sets properties (not attributes) on the given el.
 * @param  {HTMLElement} el    Element to recieve properties.
 * @param  {Array} pairs       Even length array, where odd position contain keys, and even position contain their values.
 * @return {HTMLElement}       Element paased as an argument.
 */
module.exports = function prop(el, pairs) {
  for (let i = 0; i < pairs.length; i += PAIR) {
    /* If this crashes, most probably odd length of pairs array. */
    el[pairs[i]] = pairs[i + 1];
  }

  return el;
};
