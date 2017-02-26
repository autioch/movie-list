/**
 * Binds events to the element. No delegation. The same hash can be used unbind these events.
 * No events are unbound in the application, so there's no function that does this.
 * @param  {HTMLElement} el        Element to add listeners.
 * @param  {Object} eventHash      Object where keys are event names, and values are handlers.
 * @return {HTMLElement}           Element paased as an argument.
 */
module.exports = function events(el, eventHash) {
  Object
    .keys(eventHash)
    .forEach((eventName) => el.addEventListener(eventName, eventHash[eventName]));

  return el;
};
