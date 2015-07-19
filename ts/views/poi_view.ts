define([
    'chaplin',
    'views/base/view',
    'text!templates/poi.hbs',
    'views/map/marker-collection-view'
], function(Chaplin, View, template, MarkerCollectionView) {
    'use strict';
    var mapView = null;
    var PoiView = View.extend({
        template: template,
        autoRender: true,
        className: 'poi',
        container: '#page-container',
        initialize: function() {
            mapView = Chaplin.mediator.execute('getMapView', this.collection);
        }

    });

    return PoiView;
});
