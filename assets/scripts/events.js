'use strict';

const getFormFields = require('../../lib/get-form-fields');
const app = require('./app');

const api = require('./api');
const ui = require('./ui');

const createRootFolder = function (data) {
  let folderData = {
    "folder": {
      "name": `${data.user.email}Root`,
      "path": `,${data.user._id}`,
      "_owner": data.user._id,
    },
  };

  api.createRootFolder(folderData)
    .done(ui.success)
    .fail(ui.onError);
};

const onSignUp = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();

  // console.log(data);
  api.signUp(data)
      .done(createRootFolder)
      .fail(ui.failure);
  $('#sign-up').modal('hide');
};

const getRootContents = function (data) {
  //save current path
  app.currentPath = `${app.currentPath},${data.folders[0]._id}`;

  let search = app.currentPath;
  // console.log(search);

  api.showRootFolder(search)
    .done(ui.success)
    .fail(ui.onError);
};

const getRootFolder = function (data) {
  app.user = data.user;
  app.currentPath = `,${data.user._id}`;

  let search = app.currentPath;
  // console.log(search);

  api.showRootFolder(search)
    .done(getRootContents)
    .fail(ui.onError);
};

const onGetUsers = function () {
  api.getUsers()
    .done(ui.success)
    .fail(ui.onError);
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
      .done(getRootFolder)
      .done(onGetUsers)
      .fail(ui.failure);
  $('#sign-in').modal('hide');

  // console.log(data);
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
      .done(ui.success)
      .fail(ui.failure);

  // console.log(data);
  $('#change-password').modal('hide');
};

const OnSignOut = function (event) {
  event.preventDefault();
  api.signOut()
      .done(ui.signOutSuccess)
      .fail(ui.failure);
  $('#welcome').html('Echo Diary');
  $('.after-sign-in, .after-show-diary').addClass('hide');
  $('.before-sign-in').removeClass('hide');
  $('.my-diary').empty();
  $('.edit-diary').empty();
  $('#welcome-user').html('Echo Diary');
  $('#welcome-sign').html('Record your life from here');
};

//folder ajax
const onCreateFolder = function (event) {
  event.preventDefault();
  let folderData = getFormFields(this);

  let data = {
    "folder": {
      "name": folderData.name,
      "path": app.currentPath,
    },
  };

  api.createFolder(data)
    .done(ui.createSuccess)
    .fail(ui.onError);
  $('#create-folder').modal('hide');
};

// const onUpload = function () {
//
//
// };

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
  $('#sign-out').on('click', OnSignOut);
  $('.create-folder-form').on('submit', onCreateFolder);
  $('#my-folder').on('click', api.getMyFolders);
  $('#multipart-form-data').on('submit', function (event) {
    event.preventDefault();
    let data = new FormData(this);
    console.log(data);
    $.ajax({
      url: 'http://localhost:3000/files',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      processData: false,
      contentType: false,
      data,
    }).done(data => $('.upload').html(`${data.file.url}`))
    .fail(err => console.error(err));
  });
};

module.exports = {
  addHandlers,
};
