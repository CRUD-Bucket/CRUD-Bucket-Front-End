'use strict';

const authEvents = require('./events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});
