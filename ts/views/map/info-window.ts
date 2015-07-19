
define([
    'backbonemaps'
], function(GoogleMaps) {
    'use strict';

    var InfoWindow = GoogleMaps.InfoWindow.extend({
        template: '#infoWindow-template',
    });

    return InfoWindow
});
