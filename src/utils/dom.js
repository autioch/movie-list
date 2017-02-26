/**
 * Creates new HTMLElement and return it.
 * @param  {String} tagName   Name of the tag to create.
 * @param  {String} className Classes to be set on the element.
 * @param  {mixed} children   Array of children nodes, single node or textContent.
 * @return {HTMLElement}      Created HTMLElement.
 */
module.exports = function dom(tagName, className, children) {
  const el = document.createElement(tagName);

  el.className = className;

  if (children === undefined) {
    return el;
  }

  if (Array.isArray(children)) {
    /* For large amount of children instead of just appending, fragment could be used. */
    for (let i = 0; i < children.length; i++) {
      el.appendChild(children[i]);
    }
  } else if (children instanceof Node) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.textContent = children;
  } else if (typeof children === 'number') {
    el.textContent = children.toString();
  }

  return el;
};
