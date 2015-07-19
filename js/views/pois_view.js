define([
    'views/base/collection_view',
    'views/poi_item_view',
    'text!templates/pois.hbs',
    'views/map/marker-collection-view'
], function (CollectionView, PoiItemView, template, MarkerCollectionView) {
    'use strict';
    var mapView = null;
    var PoisView = CollectionView.extend({
        lastViewModel: null,
        template: template,
        itemView: PoiItemView,
        className: 'pois',
        container: '#page-container',
        listSelector: '#poi-list',
        animationDuration: 0,
        initialize: function () {
            /*this.$el.html( this.template(this.collection) ) ;*/
            /*CollectionView.prototype.render.apply(this)*/
            // $el here is a reference to the jQuery element
            // associated with the view, todoTpl is a reference
            // to an Underscore template and model.attributes
            // contains the attributes of the model.
            // Altogether, the statement is replacing the HTML of
            // a DOM element with the result of instantiating a
            // template with the model's attributes.
            var mapOptions = {
                center: new google.maps.LatLng(40.4000, 3.7167),
                zoom: 2,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
            mapView = new MarkerCollectionView({
                collection: this.collection,
                map: map
            });
            mapView.closeChildren();
            mapView.refresh();
        }
    });
    return PoisView;
});
