define([
    'views/base/view',
    'text!templates/edit_poi.hbs',
    'chaplin',
    'views/map/marker-collection-view'
], function (View, template, Chaplin, MarkerCollectionView) {
    'use strict';
    var mapView;
    var EditPoiView = View.extend({
        template: template,
        autoRender: true,
        className: 'edit-poi',
        container: '#page-container',
        listen: {
            addedToDOM: 'focusTitle'
        },
        events: {
            'submit form': 'save'
        },
        initialize: function (a) {
            this.model.on('invalid', function (model, error) {
                this.$(".poi-" + error).addClass('has-error');
            }.bind(this));
            var mapOptions = {
                center: new google.maps.LatLng(40.4000, 3.7167),
                zoom: 2,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            if (!mapView) {
                var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
                console.log(map);
                mapView = new MarkerCollectionView({
                    collection: this.collection,
                    map: map
                });
                mapView.closeChildren();
            }
            mapView.refresh();
        },
        focusTitle: function () {
            var $input = this.$('#title');
            var nameLength = $input.val().length;
            $input.focus().prop({
                selectionStart: nameLength
            });
        },
        save: function (event) {
            event.preventDefault();
            this.clearErrors();
            var collection = this.collection;
            this.model.set({
                title: this.$('#title').val(),
                content: this.$('#content').val(),
                lat: this.$('#lat').val(),
                long: this.$('#long').val(),
                image_url: this.$('#image_url').val(),
                dragabble: false
            });
            if (this.model.isValid()) {
                if (!collection.get(this.model)) {
                    collection.push(this.model);
                }
                collection.save();
                Chaplin.utils.redirectTo({ name: 'pois' });
            }
        },
        clearErrors: function () {
            this.$('.poi-title').removeClass('has-error');
            this.$('.poi-content').removeClass('has-error');
            this.$('.poi-lat').removeClass('has-error');
            this.$('.poi-long').removeClass('has-error');
            this.$('.poi-image_url').removeClass('has-error');
        }
    });
    return EditPoiView;
});
