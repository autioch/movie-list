/**
 * Selects a children from the element.
 * @param  {HTMLElement} el  Element to query.
 * @param  {String} selector Description of the child.
 * @return {mixed}           First found element or null.
 */
module.exports = function delve(el, selector) {
  return el.querySelector(`.js-${selector}`);
};
