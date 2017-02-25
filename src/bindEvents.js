const debounce = require('lodash.debounce');
const DEBOUNCE_TIME = 250;

function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector).call(el, selector);
}

/* This binds events without option to unbind. This could be added if there was a usage. */
module.exports = function bindEvents(el, events) {
  Object.keys(events).forEach((key) => {
    const eventDesc = key.split(' ');
    const eventName = eventDesc.shift();
    const selector = `.js-${eventDesc.join(' ')}`;
    let handler = events[key];

    if (eventName === 'keyup') {
      handler = debounce(handler, DEBOUNCE_TIME);
    }

    el.addEventListener(eventName, (ev) => matches(ev.target, selector) && handler(ev));
  });
};
