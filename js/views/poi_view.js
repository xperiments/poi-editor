define([
    'views/base/view',
    'text!templates/poi.hbs',
    'views/map/marker-collection-view'
], function (View, template, MarkerCollectionView) {
    'use strict';
    var mapView = null;
    var PoiView = View.extend({
        template: template,
        autoRender: true,
        className: 'poi',
        container: '#page-container',
        initialize: function () {
        }
    });
    return PoiView;
});
