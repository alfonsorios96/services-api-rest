'use strict';

const fs = require('fs');

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
  response.status(200).json(users);
};

const post = (request, response) => {
  const user = request.body;
  const users = getUsers();
  if (users.results.some(iterator => iterator.email === user.email)) {
    response.status(500).json({
      status: 'error',
      message: 'The user exists'
    });
  } else {
    users.results.push(user);
    saveUser(users);
    response.status(200).json({
      status: 'success',
      message: 'The user register is successful'
    });
  }
};

module.exports = {get, post};
