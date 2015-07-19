define([
    'controllers/base/controller',
    'models/pois',
    'models/poi',
    'views/pois_view',
    'views/poi_view',
    'views/edit_poi_view',
    'views/map/marker-collection-view',
    'backbonemaps'
], function(Controller, Pois, Poi, PoisView, PoiView, EditPoiView, MarkerCollectionView, GoogleMaps) {
    'use strict';
    /*var mapOptions = {
        center: new google.maps.LatLng(40.4000, 3.7167),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
    var markerCollectionView = new MarkerCollectionView({
        collection:new Backbone.Collection(),
        map: map
    });*/
    var PoisController = Controller.extend({
        map: null,
        markerCollectionView: null,
        constructor: function() {
            // Instantiate map





                // Render Markers


                /*markerCollectionView.render();*/

        },
        beforeAction: function() {
            // Create a new Pois collection or preserve the existing.
            // This prevents the Pois collection from being disposed
            // in order to share it between controller actions.
            var pois = this.reuse('pois', Pois);
            // Fetch collection from storage if it’s empty.
            if (pois.length == 0) {
                pois.fetch();

            }
            /*markerCollectionView.collection = pois*/






        },

        index: function() {
            //console.log('PoisController#index');
            var pois = this.reuse('pois');
            pois.forEach(function(poi){ poi.set({dragabble:false})});
            this.view = new PoisView({ collection: pois });
            /*markerCollectionView.collection.set( new Backbone.Collection(poi) );*/
            /*markerCollectionView.render();*/
        },

        show: function(params) {
            //console.log('PoisController#show');
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            pois.forEach(function(poi){ poi.set({dragabble:false})});
            this.view = new PoiView({ model: poi });

        },

        edit: function(params) {
            //console.log('PoisController#edit');
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            if( !poi ){
                window.location.href='/'
                return;
            }
            pois.forEach(function(poi){ poi.set({dragabble:false})});
            poi.set({dragabble:true})

            this.view = new EditPoiView({ model: poi, collection: pois });


        },

        'new': function() {
            //console.log('PoisController#new');
            var poi = new Poi({ dragabble:true});
            var pois = this.reuse('pois');
            pois.forEach(function(poi){ poi.set({dragabble:false})});
            this.view = new EditPoiView({ model: poi, collection: pois });

        }

    });

    return PoisController;
});
