define([
    'views/base/view',
    'text!templates/edit_poi.hbs',
    'chaplin',
    'views/map/marker-collection-view'
], function(View, template, Chaplin, MarkerCollectionView) {
    'use strict';

    var EditPoiView = View.extend({
        template: template,
        autoRender: true,
        className: 'edit-poi',
        container: '#page-container',
        listen: {
            addedToDOM: 'focusTitle'
        },
        events: {
            'submit form': 'save',
            'reset form':'cancel'
        },
        initialize: function(a) {
            var self = this;
            this.model.on('invalid', function(model, error) {
                this.$(`.poi-${error}`).addClass('has-error');
            }.bind(this));
            Chaplin.mediator.execute('refreshMap', this.collection, new google.maps.LatLng(this.model.get('lat'),this.model.get('lng')));
            Backbone.Events.on('map-poi-updated', function(dataFromChild) {
                self.model.set({
                    lat: dataFromChild.lat,
                    long: dataFromChild.long
                });
                self.render();
            }, this);
        },
        // sets focus to first input
        focusTitle: function() {
            var $input = this.$('#title');
            var nameLength = $input.val().length;
            $input.focus().prop({
                selectionStart: nameLength
            });
        },
        // check and persiste model if valid
        save: function(event) {
            event.preventDefault();
            // Shortcuts
            this.clearErrors();
            var collection = this.collection;
            // Update model
            this.model.set({
                title: this.$('#title').val(),
                content: this.$('#content').val(),
                lat: this.$('#lat').val(),
                long: this.$('#long').val(),
                image_url: this.$('#image_url').val(),
                dragabble: false
            });

            if (this.model.isValid()) {
                // Add model to collection
                if (!collection.get(this.model)) {
                    collection.push(this.model);
                }
                // Save the model
                this.model.save();

                // Back to listing
                Chaplin.utils.redirectTo({ name: 'pois' });
            }
            this.refreshMap();
        },
        // forces google map render collection changes
        refreshMap:function(){
            Chaplin.mediator.execute('refreshMap', this.collection, new google.maps.LatLng(this.model.get('lat'),this.model.get('lng')));
        },
        // cancel editing
        cancel:function(){
            this.model.set({
                dragabble: false
            });
            this.refreshMap();
            Chaplin.utils.redirectTo({ name: 'pois' });
        },

        // clear error css classes
        clearErrors: function() {
            this.$('.poi-title').removeClass('has-error');
            this.$('.poi-content').removeClass('has-error');
            this.$('.poi-lat').removeClass('has-error');
            this.$('.poi-long').removeClass('has-error');
            this.$('.poi-image_url').removeClass('has-error');
        }

    });

    return EditPoiView;
});
