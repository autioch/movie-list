const defaultDebounce = 250;

/**
 * Delays execution of a function untill specified time passed since last call.
 * Since there is no `this` or some specific context in application, no context support is required.
 * @param  {Function} debouncedFn Function to be debeounced.
 * @param  {number} [msToWait=250]      Duration in miliseconds to wait. Default 250ms;
 * @return {Function}             Exposed function that when called, resets time to next call of debeounced function.
 */
module.exports = function debounce(debouncedFn, msToWait = defaultDebounce) {
  let timeout;
  let args;

  /**
   * Calls debounced function with last passed arguments.
   * @return {mixed} Result of the debounced function.
   */
  function later() {
    timeout = null;

    return debouncedFn(args);
  }

  /**
   * Exposed function to start and reset debounce timeout.
   * @return {undefined} Nothing.
   */
  return function exposed() {
    args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(later, msToWait);
  };
};
