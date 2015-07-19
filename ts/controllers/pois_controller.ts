define([
    'controllers/base/controller',
    'models/pois',
    'models/poi',
    'views/pois_view',
    'views/poi_view',
    'views/edit_poi_view',
    'views/delete_view',
    'views/map/marker-collection-view',
    'backbonemaps'
], function(Controller, Pois, Poi, PoisView, PoiView, EditPoiView, DeleteView, MarkerCollectionView, GoogleMaps) {
    'use strict';

    var PoisController = Controller.extend({

        beforeAction: function() {
            // get shared pois collection
            // fetch new data
            var self = this;
            var pois = this.reuse('pois', Pois);
            pois.fetch().done(function() {
                self.view.render();
            });
        },
        // poi index route
        index: function() {
            // construct view from shared collection
            var pois = this.reuse('pois');
            this.view = new PoisView({ collection: pois });
        },
        //poi edit route
        edit: function(params) {
            // construct view from shared collection
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            if (!poi) {
                window.location.href = '/'
                return;
            }
            poi.set({ dragabble: true })
            this.view = new EditPoiView({ model: poi, collection: pois });
        },
        //poi new route
        'new': function() {
            // construct view from shared collection
            var poi = new Poi({ dragabble: true });
            var pois = this.reuse('pois');
            this.view = new EditPoiView({ model: poi, collection: pois });
        },
        //poi delete route
        'delete': function(params) {
            // construct view from shared collection
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            this.view = new DeleteView({ model: poi });
        }

    });

    return PoisController;
});
