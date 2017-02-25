/* One time binder for dom events. Can't unbind (no need here). */
const DEBOUNCE_TIME = 250;

function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector).call(el, selector);
}

function debounce(debouncedFn, msToWait) {
  let timeout;

  return function exposed() {
    const args = arguments;

    function later() {
      timeout = null;
      debouncedFn(args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, msToWait);
  };
}

module.exports = function events(el, eventHash) {
  Object.keys(eventHash).forEach((key) => {
    const eventDesc = key.split(' ');
    const eventName = eventDesc.shift();
    const selector = `.js-${eventDesc.join(' ')}`;
    let handler = eventHash[key];

    if (eventName === 'keyup') {
      handler = debounce(handler, DEBOUNCE_TIME);
    }

    el.addEventListener(eventName, (ev) => matches(ev.target, selector) && handler(ev));
  });
};
