define([
    'views/map/marker-view'
], function(MarkerView) {
    'use strict';

    var DragableMarkerView = MarkerView.extend({
        overlayOptions: {
            draggable: true,
            icon: 'assets/museum.png'
        }
    });
    return DragableMarkerView;
});
