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

const displayUserFolder = function(data){
  console.log(data);
  let userFolderTemplate = require('./templates/current-user-folder.handlebars');
    $('#main-content').html(userFolderTemplate({
      folders: data.folders
    }));
};

const displayUserFile = function(data){
  console.log(data);
  let userFileTemplate = require('./templates/current-user-file.handlebars');
    $('#main-content').append(userFileTemplate({
      files: data.files
    }));
};

const displayUsers = function(data){
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
  displayUserFolder,
  displayUserFile,
};
