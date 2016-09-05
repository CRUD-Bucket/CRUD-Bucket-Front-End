'use strict';

const authEvents = require('./auth/events.js');
const folderEvents = require('./folder/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
  folderEvents.addHandlers();
});
