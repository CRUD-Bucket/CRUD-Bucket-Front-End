'use strict';

const app = require('../app');
//change this later with true path
let path;

const signUp = function (data) {
  return $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    data, //data: data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: app.api + '/sign-in',
    method: 'POST',
    data, //data: data,
  });
};

const changePassword = function (data) {
  return $.ajax({
    url: app.api + '/change-password/' + app.user._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

//folder apis
const create = function (data) {
  console.log(app.user._id);
  return $.ajax({
    url: app.api + '/folders',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      folder: {
        name: `${data.name}`,
        //change this later with true path
        path: `${app.user._id}`,
      },
    },
  });
};

const showFolders = function (data) {
  for (let i = 0; i < data.folders.length; i++) {
    //change this later with true path
    if (data.folders[i].path === path) {
      console.log(data.folders[i].name);
    }
  }
};

const getFolders = function () {
  return $.ajax({
    url: app.api + '/folders',
    method: 'GET',
  }).done(function (data) {
      showFolders(data);
    });
};

const showUsers = function (data) {
  for (let i = 0; i < data.users.length; i++) {
    $('.show-users').append(`<a href='#' class='user-list' data-id=${data.users[i]._id}>${data.users[i].email}</a><br>`);
    console.log(data.users[i]._id);
  }

  $('.user-list').on('click', function () {
    //change this later with true path
    path = $(this).data('id');
    getFolders();
  });
};

const getUsers = function () {
  console.log('show');
  return $.ajax({
    url: app.api + '/users',
    method: 'GET',
  }).done(function (data) {
    showUsers(data);
  });
};

const getMyFolders = function () {
  return $.ajax({
    url: app.api + '/userfolders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(function (data) {
      console.log(data);
    });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  create,
  getUsers,
  getFolders,
  getMyFolders,
};
