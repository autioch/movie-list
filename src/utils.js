import { HTTP_OK, HTTP_ERROR } from './consts';

export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}

// Simple memoize
const LABEL_CACHE = {};
const UPPERCASE_REGEXP = /\.?([A-Z]+)/g;
const insertSpace = (match, word) => ` ${word}`;

export function getLabel(key) {
  if (!LABEL_CACHE[key]) {
    const label = key.replace(UPPERCASE_REGEXP, insertSpace);

    LABEL_CACHE[key] = label[0].toUpperCase() + label.slice(1);
  }

  return LABEL_CACHE[key];
}

export const suffix = (count, labels) => `${count} ${count === 1 ? labels.item : labels.items}`;

/**
 * Fetches and parsed Json from given url. Window.fetch is not supported in some browsers.
 * @param  {String} url Address to query for data.
 * @return {Promise}    Promise resolving to parsed data recieved in the request.
 */
export function fetchJson(url) {
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
}
