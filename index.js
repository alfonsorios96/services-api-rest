'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const services = require('./service');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (request, response) => {
  response.send('Hello! The API is at http://localhost:3000/api');
});

app.get('/users', services.get);
app.post('/users', services.post);
app.listen(3000);

console.log('Magic happens at http://localhost:3000');
