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
        initialize: function () {
            var self = this;
            var pois = this.reuse('pois', Pois);
            if (pois.length == 0) {
                pois.fetch().done(function () {
                    self.view.render();
                });
            }
        },
        beforeAction: function () {
            var pois = this.reuse('pois', Pois);
            pois.forEach(function (poi) { poi.set({ dragabble: false }); });
            if (pois.length == 0) {
                pois.fetch();
            }
        },
        index: function () {
            var pois = this.reuse('pois');
            this.view = new PoisView({ collection: pois });
        },
        show: function (params) {
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            this.view = new PoisView({ collection: pois });
            return false;
        },
        edit: function (params) {
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            if (!poi) {
                window.location.href = '/';
                return;
            }
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
