define([
    'backbonemaps',
    'views/map/marker-view',
    'views/map/dragable-marker-view'
], function(GoogleMaps, MarkerView, DragableMarkerView) {
    'use strict';

    var MarkerCollectionView = GoogleMaps.MarkerCollectionView.extend({
        markerView: MarkerView,
        addChild: function(model) {
            this.markerView = model.get('dragabble') ? DragableMarkerView : MarkerView;
            GoogleMaps.MarkerCollectionView.prototype.addChild.apply(this, arguments);
        }
    });

    return MarkerCollectionView
});
