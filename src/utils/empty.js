/**
 * Deeply dispatches whole element tree inside element.
 * @param  {HTMLElement} el Element to be fully cleared.
 * @return {HTMLElement}    Element paased as an argument.
 */
function teardown(el) {
  while (el.firstChild) {
    teardown(el.removeChild(el.firstChild));
  }

  return el;
}

/**
 * Removes immediate children of the node.
 * @param  {HTMLElement}  el           Element to be cleared.
 * @param  {Boolean} [deeply=false]    Should remove all children of all children.
 * @return {HTMLElement}                Element paased as an argument.
 */
module.exports = function empty(el, deeply = false) {
  if (deeply) {
    return teardown(el);
  }
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  return el;
};
