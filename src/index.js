/* "Logger" for errors. */
const errorsEl = document.querySelector('.js-errors');

/* Setup error handler as soon as possible. */
window.addEventListener('error', (e) => {
  errorsEl.textContent = e.message;
}, false);

/* This should hide browser address bar. */
window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, 1), 0));

/* Main application model. */
const appModelFactory = require('./app/model');

/* Main application view. */
const appViewFactory = require('./app/view');

/* Simplest polyfill for window fetch only for jsons. */
const fetchJson = require('utils/fetchJson');

/* Application icon. */
require('./favicon.ico');

/* Fetch items and application schema. */
Promise
  .all([fetchJson('/data/schema.json'), fetchJson('/data/items.json')])

  /* Setup app model and view. */
  .then((schemaAndItems) => appViewFactory(appModelFactory(...schemaAndItems)))

  /* If data can't be fetched, just die. */
  .catch(() => {
    errorsEl.textContent = 'Failed to fetch data';
  });
