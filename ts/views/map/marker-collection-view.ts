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

          console.log( model.get('dragabble')  )
        this.markerView = model.get('dragabble') ? DragableMarkerView:MarkerView;
        GoogleMaps.MarkerCollectionView.prototype.addChild.apply(this, arguments);

      }
    });

    return MarkerCollectionView
});
