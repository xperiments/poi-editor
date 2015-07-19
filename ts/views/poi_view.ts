define([
  'views/base/view',
  'text!templates/poi.hbs',
      'views/map/marker-collection-view'
], function(View, template,MarkerCollectionView) {
  'use strict';
    var mapView = null;
  var PoiView = View.extend({

    template: template,

    autoRender: true,
    className: 'poi',
    container: '#page-container',
    initialize:function(){
        var mapOptions = {
            center: new google.maps.LatLng(40.4000, 3.7167),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        if (!mapView) {
            var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
            console.log(map)
            mapView = new MarkerCollectionView({
                collection: this.collection,
                map: map
            });
            mapView.closeChildren();

        }
        mapView.refresh();
    }

  });

  return PoiView;
});
