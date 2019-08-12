'use strict';

const fs = require('fs');
const {Builder} = require('xml2js');
const builder = new Builder();

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
  try {
    fs.writeFileSync('data.json', JSON.stringify(users));
  } catch (error) {
    throw new Error('The file is not available');
  }
};

const get = (request, response) => {
  const users = getUsers();
  response.set('Content-Type', 'text/xml');
  const result = builder.buildObject(users);
  response.status(200).send(result);
};

const post = (request, response) => {
  const xml = request.body;
  const users = getUsers();
  let user = xml.root;
  user = _formatObject(user);
  if (users.results.some(iterator => iterator.email === user.email)) {
    const _xml = builder.buildObject({
      status: 'error',
      message: 'The user exists'
    });
    response.status(500).send(_xml);
  } else {
    users.results.push(user);
    saveUser(users);
    const _xml = builder.buildObject({
      status: 'success',
      message: 'The user register is successful'
    });
    response.status(200).send(_xml);
  }
};

const _formatObject = object => {
  for (const key in object) {
    object[key] = typeof object[key] === 'object' && !Array.isArray(object[key]) ? _formatObject(object[key]) : object[key][0];
  }
  return object;
};

module.exports = {get, post};
