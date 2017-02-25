const appModelFactory = require('./app/model');
const appViewFactory = require('./app/view');

require('./favicon.ico');

window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 1), 0));

function fetchJson(url) {
  return window.fetch(url).then((response) => response.json());
}

Promise
  .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])
  .then((appData) => appViewFactory(appModelFactory(...appData)));
