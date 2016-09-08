'use strict';

const getFormFields = require('../../lib/get-form-fields');
const app = require('./app');

const api = require('./api');
const ui = require('./ui');




const displayUserFolder = function(data){
  console.log(data);
  let userFolderTemplate = require('./templates/current-user-folders.handlebars');
    $('#main-content').html(userFolderTemplate({
      folders: data.folders
    }));
};



const displayUserFile = function(data){
  console.log('send to handlebars');
  console.log(data);
  let userFileTemplate = require('./templates/current-user-files.handlebars');
    $('#main-content').append(userFileTemplate({
      files: data.files
    }));
};

// const refreshPage = function() {
//   let path = app.currentPath;
//
//   console.log(path);
//
//   api.showRootFolder(path)
//     .done()
//     .fail();
//   api.showRootFiles(path)
//     .done(displayUserFile)
//     .fail();
// };


const displayOtherUserFolder = function(data){
  console.log(data);
  let otherUserFolderTemplate = require('./templates/other-users-folder.handlebars');
    $('#main-content').html(otherUserFolderTemplate({
      folders: data.folders
    }));
};

const displayOtherUserFile = function(data){
  console.log(data);
  let otherUserFileTemplate = require('./templates/other-users-file.handlebars');
    $('#main-content').append(otherUserFileTemplate({
      files: data.files
    }));
};





const createRootFolder = function (data) {
  let folderData = {
    folder: {
      name: `${data.user.email}Root`,
      path: `,${data.user._id}`,
      _owner: data.user._id,
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

const openFolder = function (newPath) {
  app.currentPath = newPath;

  let search = app.currentPath;

  // console.log(search);

  api.showRootFolder(search)
    .done(displayUserFolder)
    .fail(ui.onError);
  api.showRootFiles(search)
    .done(displayUserFile)
    .fail(ui.onError);
};

const openOtherFolder = function (newPath) {
  app.currentPath = newPath;

  let search = app.currentPath;

  // console.log(search);

  api.showRootFolder(search)
    .done(displayOtherUserFolder)
    .fail(ui.onError);
  api.showRootFiles(search)
    .done(displayOtherUserFile)
    .fail(ui.onError);
};

const getRootContents = function (data) {
  //save current path
  app.currentPath = `${app.currentPath},${data.folders[0]._id}`;

  let search = app.currentPath;

  // console.log(search);

  api.showRootFolder(search)
    .done(displayUserFolder)
    .fail(ui.onError);
  api.showRootFiles(search)
    .done(displayUserFile)
    .fail(ui.onError);
};

const getRootFolder = function (data) {
  console.log('getRootFolder');
  console.log(data);
  app.user = data.user;
  app.currentPath = `,${data.user._id}`;

  let search = app.currentPath;

  // console.log(search);

  api.showRootFolder(search)
    .done(getRootContents)
    .fail(ui.onError);
};

const getOtherRootContents = function (data) {
  //save current path
  app.currentPath = `${app.currentPath},${data.folders[0]._id}`;

  let search = app.currentPath;

  // console.log(search);

  api.showRootFolder(search)
    .done(displayOtherUserFolder)
    .fail(ui.onError);
  api.showRootFiles(search)
    .done(displayOtherUserFile)
    .fail(ui.onError);
};

const displayUsers = function(data){
  console.log(data);
  let userTemplate = require('./templates/user.handlebars');
  $('.sidebar-nav').html(userTemplate({
      users: data.users,
    }));
};


const onGetUsers = function () {
  api.getUsers()
    .done(displayUsers)
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
};

const addOneFolder = (data) => {
  let userFolderTemplate = require('./templates/current-user-folder.handlebars');
    $('#main-content').append(userFolderTemplate({
      name:data.folder.name,
      _id: data.folder._id,
      createdAt: data.folder.createdAt,
      updatedAt: data.folder.updatedAt,
    }));
};

//folder ajax
const onCreateFolder = function (event) {
  event.preventDefault();
  let folderData = getFormFields(this);

  let data = {
    folder: {
      name: folderData.name,
      path: app.currentPath,
    },
  };

  api.createFolder(data)
    .done(addOneFolder)
    .fail(ui.onError);
  $('#create-folder').modal('hide');
};

// const onUpload = function () {
//
//
// };

const onIcon = function (event) {
  let target = $(event.target);
  if (target.hasClass('rename-button')) {
    let fileId = target.data('fileId');
    let newName = $(target).prev().val();

      let data = {
        "file" : {
          "name": newName,
        }
      };

      api.renameFile(data, fileId)
        .done($(target).prevAll('h5:last').text(newName))
        .fail(ui.onError);
  }
  else if (target.hasClass('delete-button')) {
    let fileId = target.data('fileId');
      api.deleteFile(fileId)
        .done($(target).parent().remove())
        .fail(ui.onError);
  }
  else if (target.hasClass('rename-folder-button')) {
    let folderId = target.data('folder-id');
    let newName = $(target).prev().val();

      let data = {
        "folder" : {
          "name": newName,
        }
      };

      api.renameFolder(data, folderId)
        .done($(target).prevAll('h5:last').text(newName))
        .fail(ui.onError);
  }
  else if (target.hasClass('delete-folder-button')) {
    let folderId = target.data('folder-id');
      api.deleteFolder(folderId)
        .done($(target).parent().remove())
        .fail(ui.onError);
  }
  else if (target.hasClass('foldericon')) {
    let path = target.data('path');
    let folderId = target.nextAll('button:first').data('folder-id');

    let newPath = `${path},${folderId}`;
    openFolder(newPath);
  }
  else if (target.hasClass('otherfoldericon')) {
    let path = target.data('path');
    let folderId = target.data('folder-id');

    let newPath = `${path},${folderId}`;
    openOtherFolder(newPath);
  }
};

const addOneFile = (data) => {
  let userFileTemplate = require('./templates/current-user-file.handlebars');
    $('#main-content').append(userFileTemplate({
      name:data.file.name,
      _id: data.file._id,
      url: data.file.url,
      createdAt: data.file.createdAt,
      updatedAt: data.file.updatedAt,
    }));
};

const onUser = function (event) {
  let target = $(event.target);
  if (target.data('id') === app.user._id) {
    getRootFolder(app);
  }
  else {
    let search = target.data('path');
    app.currentPath = search;
      api.showRootFolder(search)
        .done(getOtherRootContents)
        .fail(ui.onError);
  }


  // $('.username').on('click', function(){
  //   let search = ($(this).data("path"));
  //   app.currentPath = search;
  //   api.showRootFolder(search)
  //     .done(getOtherRootContents)
  //     .fail(ui.onError);
  // });



  // if (target.hasClass('rename-button')) {
  //   let fileId = target.data('fileId');
  //   let newName = $(target).prev().val();
  //
  //     let data = {
  //       "file" : {
  //         "name": newName,
  //       }
  //     };
  //
  //     api.renameFile(data, fileId)
  //       .done($(target).prevAll('h5:last').text(newName))
  //       .fail(ui.onError);
  // }
};

const addHandlers = () => {
  $('.icon-div').on('click', onIcon);
  $('.sidebar-nav').on('click', onUser);
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
  $('#sign-out').on('click', OnSignOut);
  $('.create-folder-form').on('submit', onCreateFolder);
  $('#my-folder').on('click', api.getMyFolders);
  $('#multipart-form-data').on('submit', function (event) {
    event.preventDefault();
    let data = new FormData(this);
    data.append('path', app.currentPath);
    console.log('upload');
    return $.ajax({
      url: app.api + '/files',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      processData: false,
      contentType: false,
      data,
    }).done(addOneFile)
    .done($('#upload-file').modal('hide'))
    .fail(err => console.error(err));
  });
};

module.exports = {
  addHandlers,
};
