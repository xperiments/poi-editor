define([
    'backbonemaps',
    'views/map/info-window'
], function (GoogleMaps, InfoWindow) {
    'use strict';
    var MarkerView = GoogleMaps.MarkerView.extend({
        infoWindow: InfoWindow,
        initialize: function () {
            _.bindAll(this, 'handleDragEnd');
        },
        mapEvents: {
            'dragend': 'handleDragEnd',
        },
        handleDragEnd: function (e) {
            Backbone.Events.trigger('map-poi-updated', {
                lat: e.latLng.lat(),
                long: e.latLng.lng()
            });
        },
    });
    return MarkerView;
});
