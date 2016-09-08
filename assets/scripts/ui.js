'use strict';

const app = require('./app');

const success = (data) => {
  console.log('success');
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signOutSuccess = () => {
  delete app.user;
  $('.icon-div').empty();
  $('.sidebar-nav').empty();
};

const createSuccess = () => {
  console.log('folder created');
};

module.exports = {
  failure,
  success,
  signOutSuccess,
  app,
  createSuccess,
};
