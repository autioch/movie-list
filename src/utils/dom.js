/* eslint-disable no-param-reassign */
module.exports = function dom(tagName, className, children) {
  const el = document.createElement(tagName);

  el.className = className;

  if (children === undefined) {
    return el;
  }

  if (Array.isArray(children)) {
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
