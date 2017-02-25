/* Utility method for setting up dom element properties. */
const PAIR = 2;

module.exports = function prop(el, pairs) {
  for (let i = 0; i < pairs.length; i += PAIR) {
    /* If this crashes, most probably odd length of pairs array. */
    el[pairs[i]] = pairs[i + 1];
  }

  return el;
};
