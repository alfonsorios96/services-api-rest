'use strict';

const fs = require('fs');
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC9974b4105026b8757cdb8ba3a6e8a29b';
const authToken = '82ae63f314d427ec101fbbe9f7f0eb8d';
const client = require('twilio')(accountSid, authToken);

const getUsers = () => {
  let users = [];
  let file;
  try {
    file = fs.readFileSync('data.json');
    users = JSON.parse(file);
  } catch (error) {
    throw new Error('The file is not available');
  }
  return users;
};

const saveUser = users => {
  let file;
  try {
    fs.writeFileSync('data.json', JSON.stringify(users));
  } catch (error) {
    throw new Error('The file is not available');
  }
};

const get = (request, response) => {
  const users = getUsers();
  response.status(200).json(users);
};

const post = (request, response) => {
  const user = request.body;
  const users = getUsers();
  if (users.some(iterator => iterator.user === user.user)) {
    response.status(500).json({
      status: 'error',
      message: 'The user exists'
    });
  } else {
    users.push(user);
    saveUser(users);
    response.status(200).json({
      status: 'success',
      message: 'The user register is successful'
    });
  }
};

const sms = (request, response) => {
  const user = request.body.user;
  client.messages
    .create({
      body: `Te estoy espiando ${user.name}`,
      from: '+14302160667',
      to: `+52${user.phone}`
    })
    .then(message => {
      console.log(message.sid);
      response.status(200).json({
        message: 'Mensaje enviado'
      });
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        message: 'Mensaje NO enviado'
      });
    });
};

module.exports = {get, post, sms};
