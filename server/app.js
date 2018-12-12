const express = require('express');
const morgan = require('morgan');
const path = require('path');
const api = require('./api');

const morganFormat = (tokens, req, res) => {
  const log = {
    date: tokens.date(req, res, 'clf'),
    addr: tokens['remote-addr'](req),
    user: tokens['remote-user'](req),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    length: tokens.res(req, res, 'content-length'),
    msec: tokens['response-time'](req, res),
    referrer: tokens.referrer(req)
  };
  const str = JSON.stringify(log);
  return str;
};

const app = express();

app.use(morgan(morganFormat, {
  skip: (req, res) => (false),
  stream: { write: console.log }
}));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/mlt', (req, res) => (
  api.mlt(req, res).catch((e) => {
    console.error(e);
    res.status(500).send('Internal Server Error');
  })
));

module.exports = app;

