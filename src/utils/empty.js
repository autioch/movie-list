/**
 * Removes immediate children of the node.
 * @param  {HTMLElement}  el           Element to be cleared.
 * @return {HTMLElement}                Element paased as an argument.
 */
module.exports = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  return el;
};
