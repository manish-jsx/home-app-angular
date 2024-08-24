// netlify/functions/json-server.js
const { createServer, Model } = require('json-server');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const server = createServer();
server.use(createServer.router(db));
server.use(createServer.defaults());

exports.handler = async function(event, context) {
  return new Promise((resolve, reject) => {
    server._handle(requestToExpress(event), context.callbackWaitsForEmptyEventLoop, (err, res) => {
      if (err) return reject(err);
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: res.body,
      });
    });
  });
};

function requestToExpress(event) {
  return {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    body: event.body,
    query: event.queryStringParameters,
    params: event.pathParameters,
  };
}
