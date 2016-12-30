/*eslint no-console: 0 */
'use strict';
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const PORT = 80;
const root = path.join(__dirname, '..', 'build');

function getTime() {
  const time = new Date();
  return [time.getHours(), time.getMinutes(), time.getSeconds()]
    .map(val => val.toString())
    .map(str => str.length < 2 ? `0${str}` : str)
    .join(':');
}

function sendFile(response, file, filename) {
  console.log(`${getTime()}  200  ${filename}`);
  response.writeHead(200);
  response.write(file, 'binary');
  response.end();
}

function sendError(response, code, filename) {
  console.log(`${getTime()}  ${code}  ${filename}`);
  response.writeHead(code, {
    'Content-Type': 'text/plain'
  });
  response.end();
}

function handleRequest(request, response) {
  const uri = url.parse(request.url).pathname;
  let filename = path.join(root, uri);
  console.log(`${getTime()}  REQ  ${uri}`);

  fs.exists(filename, function(exists) {
    if (!exists) {
      return sendError(response, 404, uri);
    }
    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }
    fs.readFile(filename, 'binary', function(err, file) {
      if (err) {
        return sendError(response, 500, uri);
      }
      sendFile(response, file, uri);
    });
  });
}

http.createServer(handleRequest).listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
