'use strict';

const authEvents = require('./events.js');

// On document ready
$(() => {
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
  authEvents.addHandlers();
});
