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
  console.log('success');
};

const createSuccess = () => {
  console.log('folder created');
};

const displayUsers = function (data) {
  let userTemplate = require('./templates/user.handlebars');
  $('.sidebar-nav').html(userTemplate({
      users: data.users,
    }));
};

module.exports = {
  failure,
  success,
  signOutSuccess,
  app,
  createSuccess,
  displayUsers,
};
