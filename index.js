'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const services = require('./service');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (request, response) => {
  response.send('Hello! The API is at http://localhost:' + PORT + '/api');
});

app.post('/wp-json/wc/kueskipay/v1/confirmation', services.kueskiConfirmation);
app.listen(PORT);

console.log('Magic happens at http://localhost:' + PORT);
