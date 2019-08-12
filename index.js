'use strict';

const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');

const app = express();
const PORT = process.env.PORT || 8080;

const services = require('./service');

app.use(cors());
app.use(xmlparser());

app.get('/', (request, response) => {
  response.send('Hello! The API is at http://localhost:' + PORT + '/api');
});

app.get('/users', services.get);
app.post('/users', services.post);
app.listen(PORT);

console.log('Magic happens at http://localhost:' + PORT);
