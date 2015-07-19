define([
    'chaplin',
    'views/base/collection_view',
    'views/poi_item_view',
    'text!templates/pois.hbs',
    'views/map/marker-collection-view'
], function(Chaplin, CollectionView, PoiItemView, template, MarkerCollectionView) {
    'use strict';

    var mapView = null;
    var PoisView = CollectionView.extend({
        lastViewModel:null,
        template: template,
        itemView: PoiItemView,
        className: 'pois',
        container: '#page-container',
        listSelector: '#poi-list',
        animationDuration: 1000,
        initialize: function() {
            mapView = Chaplin.mediator.execute('getMapView', this.collection) ;
        }
    });

    return PoisView;
});
