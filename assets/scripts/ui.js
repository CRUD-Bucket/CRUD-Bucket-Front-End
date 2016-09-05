'use strict';

const app = require('./app');

const signInSuccess = (data) => {
  app.user = data.user;
  // console.log(app.user.email);
};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signOutSuccess = () => {
  delete app.user;
  console.log('success');
};

const createSuccess = (data) => {
  app.folder = data.folder;
  console.log(app.folder);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
  createSuccess,
};
