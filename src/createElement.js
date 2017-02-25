module.exports = function createElement(className = '', tagName = 'div') {
  const el = document.createElement(tagName);

  el.className = className;

  return el;
};
