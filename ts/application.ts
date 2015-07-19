define([
    'chaplin',
    'bootstrap',
    'views/map/marker-collection-view',
    'text!templates/info_window.hbs',
    'handlebars'
], function(Chaplin, BootStrap, MarkerCollectionView, infoWindowTemplate, Handlebars) {
    'use strict';

    // Shared app Map
    var mapOptions = {
        center: new google.maps.LatLng(40.4000, 3.7167),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
    var mapView = null;
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });
    var infowindowMarker = new google.maps.Marker({
        position: new google.maps.LatLng(0, 0),
        map: map,
        title: 'Uluru (Ayers Rock)',
        visible: false
    });
    var windowTemplate = Handlebars.compile(infoWindowTemplate);

    var Application = Chaplin.Application.extend({
        title: 'Pois Manager',
        // add map mediators
        initMediator: function() {
            Chaplin.mediator.setHandler('refreshMap', this.refreshMap);
            Chaplin.mediator.setHandler('getMapView', this.getMapView);
            Chaplin.mediator.setHandler('openInfoWindow', this.openInfoWindow);
            Chaplin.mediator.setHandler('closeInfoWindow', this.closeInfoWindow);
        },
        // updates map collection & center map if provided
        refreshMap: function(collection, center) {
            if (!mapView) mapView = this.getMapView();
            if (center) map.setCenter(center)
            mapView.refresh();
        },
        // returns the shared mapView
        // if no one is pressent created the default
        getMapView: function(collection) {
            if (!mapView) {
                mapView = new MarkerCollectionView({
                    collection: collection,
                    map: map
                });
            }
            return mapView;
        },
        // opens an infoWindow with data from the model
        openInfoWindow: function(model) {
            if (infowindow) infowindow.close();
            var point = new google.maps.LatLng(model.get('lat'), model.get('lng'));
            map.setCenter(point);
            infowindowMarker.setPosition(point);
            infowindow.setContent(windowTemplate(model.attributes));
            infowindow.open(map, infowindowMarker);
        },
        // closes the active infowindow if present
        closeInfoWindow: function() {
            if (infowindow) infowindow.close();
        }
    });

    return Application;
});
