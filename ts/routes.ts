define(function() {
  'use strict';

  // The routes for the application. This module returns a function.
  // `match` is the match method of the Router.
  return function(match) {

    match('', 'pois#index', { name: 'pois' });
    match('new', 'pois#new', { name: 'new_poi' });
    match(':id', 'pois#show', { name: 'show_poi' });
    match('edit/:id', 'pois#edit', { name: 'edit_poi' });


  };
});
