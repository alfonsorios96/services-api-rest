'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const services = require('./service');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/', services.sms);

app.get('/users', services.get);
app.post('/users', services.post);
app.listen(3000);

console.log('Magic happens at http://localhost:3000');
