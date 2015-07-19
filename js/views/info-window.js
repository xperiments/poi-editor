define([
    'views/base/view',
    'text!templates/modal.hbs',
    'backbonemaps'
], function (View, template, GoogleMaps) {
    'use strict';
    var InfoWindow = GoogleMaps.InfoWindow.extend({
        template: '#infoWindow-template',
        events: {
            'mouseenter h2': 'logTest'
        },
        logTest: function () {
            console.log('test in InfoWindow');
        }
    });
    return InfoWindow;
});
