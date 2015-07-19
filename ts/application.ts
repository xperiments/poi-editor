define(['chaplin','bootstrap'], function(Chaplin, BootStrap) {
  'use strict';

  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: 'Pois Manager'
  });

  return Application;
});
