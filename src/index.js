const App = require('./app');
const videos = require('./data.json');
const prepare = require('./prepare');
const view = require('./view');
const fields = require('./fields');

view(new App(prepare(videos), fields));
