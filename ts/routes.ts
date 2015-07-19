define(function() {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is the match method of the Router.
    return function(match) {

        // list view
        match('', 'pois#index', { name: 'pois' });
        // new poi view
        match('new', 'pois#new', { name: 'new_poi' });
        // edit poi view
        match('edit/:id', 'pois#edit', { name: 'edit_poi' });
        // delete poi view
        match('delete/:id', 'pois#delete', { name: 'delete_poi' });

    };
});
