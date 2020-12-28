const delve = require('utils/delve');

/* "Logger" for errors. */
const errorsEl = delve(document, 'errors');

/* Main application model. */
const appModelFactory = require('./app/model');

/* Main application view. */
const appViewFactory = require('./app/view');

/* Simplest polyfill for window fetch only for jsons. */
const fetchJson = require('utils/fetchJson');

/* Fetch items and application schema. */
Promise
  .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])

  /* Setup app model and view. */
  .then((schemaAndItems) => {
    const appModel = appModelFactory(...schemaAndItems);

    requestAnimationFrame(() => appViewFactory(appModel));
  })

  /* If data can't be fetched, just die. */
  .catch((err) => {
    errorsEl.textContent = err;
  });
