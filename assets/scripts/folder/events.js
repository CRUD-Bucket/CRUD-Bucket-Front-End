'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onCreate = function (event) {
  let folderData = getFormFields(this);
  console.log(folderData);
  event.preventDefault();

  api.create(folderData)
    .done(ui.createSuccess)
    .fail(ui.onError);
  $('#create-folder').modal('hide');

};

const addHandlers = () => {
  $('.create-folder-form').on('submit', onCreate);
  $('#show-users').on('click', api.getUsers);
  $('#my-folder').on('click', api.getMyFolders);


};

module.exports = {
    addHandlers,
  };
