define([
    'backbonemaps',
    'views/map/marker-view',
    'views/map/dragable-marker-view'
], function(GoogleMaps, MarkerView, DragableMarkerView ) {
    'use strict';

    var MarkerCollectionView = GoogleMaps.MarkerCollectionView.extend({
      markerView: MarkerView,
      /*initialize:function(){
          var that = this;
          Backbone.Events.on( 'map-show-info', function ( view  ) {

             that.refresh();

          }, this );
      },*/
      addChild: function(model) {
          console.log('paso',model.attributes.dragabble)
        this.markerView = model.attributes.dragabble ? DragableMarkerView:MarkerView;
        GoogleMaps.MarkerCollectionView.prototype.addChild.apply(this, arguments);

      }
    });

    return MarkerCollectionView
});
