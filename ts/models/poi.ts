define([
    'chaplin',
    'models/base/model'
], function(Chaplin, Model) {
        'use strict';

        var Poi = Model.extend({
            // url checking https://gist.github.com/dperini/729294
            checkUrlRegexp: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            defaults: {
                title: '',
                content: '',
                lat: 0,
                long: 0,
                image_url: '',
                dragabble:false
            },
            validate: function(attributes) {
                // Empty title
                if (attributes.title === '') return 'title';
                // Empty content
                if (attributes.content === '') return 'content';
                // Invalid lattitude
                if (attributes.lat !== '' && Math.abs(parseFloat(attributes.lat)) > 90) {
                    return 'lat';
                }
                // Invalid longitude
                if (attributes.long !== '' && Math.abs(parseFloat(attributes.long)) > 180) {
                    return 'long';
                }
                // Invalid url format
                if (attributes.image_url !== '' && !this.checkUrlRegexp.test(attributes.image_url)) {
                    return 'image_url';
                }
            },
            constructor: function() {
              _.bindAll(this, 'select', 'deselect', 'toggleSelect', 'getLatLng', 'getLatlng');

              this.defaults = _.extend({}, {
                lat: 0,
                lng: 0,
                selected: false,
                title: ""
              }, this.defaults);

              Model.prototype.constructor.apply(this, arguments);

              // Trigger 'selected' and 'deselected' events
              this.on("change:selected", function(model, isSelected) {
                var topic = isSelected ? "selected" : "deselected";
                this.trigger(topic, this);
              }, this);
            },

            select: function() {
              this.set("selected", true);
            },

            deselect: function() {
              this.set("selected", false);
            },

            toggleSelect: function() {
              this.set("selected", !this.get("selected"));
            },

            getLatlng: function() {
              return this.getLatLng();
            },

            getLatLng: function() {
              return new google.maps.LatLng(this.get("lat"), this.get("lng"));
            },

            // Overwrite save function
            //http://stackoverflow.com/questions/13051966/exclude-model-properties-when-syncing-backbone-js

           save: function(attrs, options) {
               options || (options = {});
               attrs || (attrs = _.clone(this.attributes));
               var post = _.clone(this.attributes);


               // Filter the data to send to the server
               delete post.selected;
               delete post.lng;
               delete post.dontSync;
               delete post.dragabble;
               attrs.dragabble = false;
               // attrs.lat = parseFloat( attrs.lat );
               // attrs.long = parseFloat( attrs.long );
               options.data = JSON.stringify({ post:post});

               // Proxy the call to the original save function
               return Chaplin.Model.prototype.save.call(this, attrs, options);
           }
        });

        return Poi;
    });
