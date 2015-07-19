define([
    'backbonemaps',
    'views/map/info-window'
], function(GoogleMaps, InfoWindow) {
    'use strict';

    var MarkerView = GoogleMaps.MarkerView.extend({
        infoWindow: InfoWindow,
        initialize: function() {
            _.bindAll(this, 'handleDragEnd');
        },
        mapEvents: {
            'dragend': 'handleDragEnd',
            dblclick: 'tellTheWorldAboutIt'
        },
        handleDragEnd: function(e) {
            alert('Dropped at: \n Lat: ' + e.latLng.lat() + '\n lng: ' + e.latLng.lng());
        },
        tellTheWorldAboutIt: function() {
            console.assert(this instanceof MarkerView);
            alert('You done gone and double-clicked me!');
            this.logIt('I hope you know that this will go down on your permanent record.')
        },
        logIt: function(message) {
            console.assert(this instanceof MarkerView);
            console.log(message);
        }
    });
    return MarkerView;
});
