const path = require('path');
const qbMovieList = require('../index');

qbMovieList({
  buildFolder: path.join(__dirname, '..', 'dist'),
  isProduction: true
})
  .then((msg) => console.log(msg))
  .catch((msg) => console.log(msg));
