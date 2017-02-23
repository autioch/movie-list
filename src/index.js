const { App } = require('./core');
const setViews = require('./setViews');

const appInstance = new App();

setViews(appInstance);
