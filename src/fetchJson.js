const HTTP_OK = 200;
const HTTP_ERROR = 400;

/**
 * Fetches and parsed Json from given url. Window.fetch is not supported in some browsers.
 * @param  {String} url Address to query for data.
 * @return {Promise}    Promise resolving to parsed data recieved in the request.
 */
module.exports = function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = function() { // eslint-disable-line func-names
      if (request.status >= HTTP_OK && request.status < HTTP_ERROR) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(request.statusText);
      }
    };
    request.onerror = reject;
    request.open('GET', url, true);
    request.send();
  });
};
