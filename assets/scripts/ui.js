'use strict';

const app = require('./app');

const savePath = (data) => {
  console.log('save path');
  console.log(data);
  app.path = data.folder.path;
};

const signInSuccess = (data) => {
  app.user = data.user;
  savePath(data);
  // console.log(app.user.email);
};

const success = (data) => {
  console.log('success');
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
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
  createSuccess,
};
