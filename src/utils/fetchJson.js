/* Simplest polyfill for window fetch only for jsons. */
module.exports = function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        resolve(JSON.parse(this.responseText));
      }
    };
    request.onerror = reject;
    request.open('GET', url, true);
    request.send();
  });
};
