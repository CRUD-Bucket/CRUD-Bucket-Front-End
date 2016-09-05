'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
let path;

const create = function (data) {
  console.log(authApi.app.user._id);
  return $.ajax({
    url: app.api + '/folders',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      folder: {
        name: `${data.name}`,
        path: `${authApi.app.user._id}`,
      },
    },
  });
};

const showUsers = function (data) {
  for (let i = 0; i < data.users.length; i++) {
    $('.show-users').append(`<a href='#' class='user-list' data-id=${data.users[i]._id}>${data.users[i].email}</a><br>`);
    console.log(data.users[i]._id);
  }

  $('.user-list').on('click', function () {
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

const showFolders = function (data) {
  for (let i = 0; i < data.folders.length; i++) {
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

const getMyFolders = function () {
  return $.ajax({
    url: app.api + '/userfolders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
  }).done(function (data) {
      console.log(data);
    });
};

module.exports = {
  create,
  getUsers,
  getFolders,
  getMyFolders,

};
