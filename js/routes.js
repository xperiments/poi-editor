define(function () {
    'use strict';
    return function (match) {
        match('', 'pois#index', { name: 'pois' });
        match('new', 'pois#new', { name: 'new_poi' });
        match(':id', 'pois#show', { name: 'show_poi' });
        match('edit/:id', 'pois#edit', { name: 'edit_poi' });
    };
});
