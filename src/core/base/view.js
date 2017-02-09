const debounce = require('lodash.debounce');

const DEBOUNCE_EVENTS = ['keyup'];
const DEBOUNCE_TIME = 500;

function View() {
  this.el = document.createElement(this.tagName);
  if (this.className) {
    this.el.className = this.className;
  }
  Object.keys(this.events).forEach((key) => {
    const eventDesc = key.split(' ');
    const eventName = eventDesc.shift();
    const selector = `.js-${eventDesc.join(' ')}`;
    let handler = this[this.events[key]];

    if (DEBOUNCE_EVENTS.indexOf(eventName) > -1) {
      handler = debounce(handler, DEBOUNCE_TIME);
    }

    this.el.addEventListener(eventName, (ev) => ev.target.matches(selector) && handler.call(this, ev));
  });
  this.initialize.apply(this, arguments);
}

View.prototype = {
  constructor: View,
  events: {},
  el: null,
  className: '',
  template: () => '',
  tagName: 'div',
  initialize() {},
  render() {
    if (this.removed) {
      return console.warn('Attempting to render removed view.');
    }
    this.el.innerHTML = this.template(this.data());
  },
  find(selector) {
    return this.el.querySelector(`.js-${selector}`);
  },
  data() {
    return {};
  },
  empty() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
  },
  remove() {
    if (this.removed) {
      return;
    }
    Object.keys(this.events).forEach((key) => this.el.removeEventListener(key.split(' ').shift(), this[this.events.key]));
    this.el.remove();
    Object.getOwnPropertyNames(this).forEach((key) => {
      this[key] = null;
    });
    this.removed = true;
  }
};

View.extend = function extend(childMethods) {
  const ParentView = this;
  const parentMethods = ParentView.prototype;
  let ChildView;

  if (childMethods.hasOwnProperty('constructor')) {
    ChildView = childMethods.constructor;
  } else {
    ChildView = function() {
      return ParentView.apply(this, arguments);
    };
  }
  ChildView.prototype = Object.assign({}, parentMethods, childMethods);
  ChildView.prototype.events = Object.assign({}, parentMethods.events, childMethods.events);
  ChildView.prototype.contructor = ChildView;

  if (childMethods.remove) {
    ChildView.prototype.remove = function() {
      childMethods.remove.apply(this, arguments);
      parentMethods.remove.apply(this, arguments);
    };
  }

  ChildView.extend = ParentView.extend;

  return ChildView;
};

module.exports = View;
