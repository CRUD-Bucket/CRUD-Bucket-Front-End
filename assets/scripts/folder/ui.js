'use strict';

const app = require('../app');

const createSuccess = (data) => {
  app.folder = data.folder;
  console.log(app.folder);

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

module.exports = {
  failure,
  success,
  createSuccess,
  signOutSuccess,
  app,
};
