define([
    'controllers/base/controller',
    'models/pois',
    'models/poi',
    'views/pois_view',
    'views/poi_view',
    'views/edit_poi_view',
    'views/map/marker-collection-view',
    'backbonemaps'
], function (Controller, Pois, Poi, PoisView, PoiView, EditPoiView, MarkerCollectionView, GoogleMaps) {
    'use strict';
    var PoisController = Controller.extend({
        map: null,
        markerCollectionView: null,
        constructor: function () {
            // Instantiate map
        },
        beforeAction: function () {
            var pois = this.reuse('pois', Pois);
            if (pois.length == 0) {
                pois.fetch();
            }
        },
        index: function () {
            var pois = this.reuse('pois');
            pois.forEach(function (poi) { poi.set({ dragabble: false }); });
            this.view = new PoisView({ collection: pois });
        },
        show: function (params) {
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            pois.forEach(function (poi) { poi.set({ dragabble: false }); });
            this.view = new PoiView({ model: poi });
        },
        edit: function (params) {
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            if (!poi) {
                window.location.href = '/';
                return;
            }
            pois.forEach(function (poi) { poi.set({ dragabble: false }); });
            poi.set({ dragabble: true });
            this.view = new EditPoiView({ model: poi, collection: pois });
        },
        'new': function () {
            var poi = new Poi({ dragabble: true });
            var pois = this.reuse('pois');
            pois.forEach(function (poi) { poi.set({ dragabble: false }); });
            this.view = new EditPoiView({ model: poi, collection: pois });
        }
    });
    return PoisController;
});
