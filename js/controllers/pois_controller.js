define([
    'controllers/base/controller',
    'models/pois',
    'models/poi',
    'views/pois_view',
    'views/poi_view',
    'views/edit_poi_view'
], function (Controller, Pois, Poi, PoisView, PoiView, EditPoiView) {
    'use strict';
    var PoisController = Controller.extend({
        beforeAction: function () {
            var pois = this.reuse('pois', Pois);
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
            this.view = new PoiView({ model: poi });
        },
        edit: function (params) {
            var pois = this.reuse('pois');
            var poi = pois.get(params.id);
            this.view = new EditPoiView({ model: poi, collection: pois });
        },
        'new': function () {
            var poi = new Poi();
            var pois = this.reuse('pois');
            this.view = new EditPoiView({ model: poi, collection: pois });
        }
    });
    return PoisController;
});
