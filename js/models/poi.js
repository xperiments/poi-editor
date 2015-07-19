define([
    'chaplin',
    'models/base/model'
], function (Chaplin, Model) {
    'use strict';
    var Poi = Model.extend({
        checkUrlRegexp: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
        defaults: {
            title: '',
            content: '',
            lat: 0,
            long: 0,
            image_url: '',
            dragabble: false,
            lng: 0,
            selected: false
        },
        validate: function (attributes) {
            if (attributes.title === '')
                return 'title';
            if (attributes.content === '')
                return 'content';
            if (attributes.lat !== '' && Math.abs(parseFloat(attributes.lat)) > 90) {
                return 'lat';
            }
            if (attributes.long !== '' && Math.abs(parseFloat(attributes.long)) > 180) {
                return 'long';
            }
            if (attributes.image_url !== '' && !this.checkUrlRegexp.test(attributes.image_url)) {
                return 'image_url';
            }
        },
        constructor: function () {
            _.bindAll(this, 'select', 'deselect', 'toggleSelect', 'getLatLng', 'getLatlng');
            Model.prototype.constructor.apply(this, arguments);
            this.on("change:selected", function (model, isSelected) {
                var topic = isSelected ? "selected" : "deselected";
                this.trigger(topic, this);
            }, this);
        },
        select: function () { },
        deselect: function () { },
        toggleSelect: function () {
            Chaplin.mediator.execute('openInfoWindow', this);
        },
        getLatlng: function () {
            return this.getLatLng();
        },
        getLatLng: function () {
            return new google.maps.LatLng(this.get("lat"), this.get("lng"));
        },
        url: 'https://challenge-api-pedro.herokuapp.com/posts/',
        destroy: function (options) {
            var opts = _.extend({ url: this.url + this.id }, options || {});
            return Chaplin.Model.prototype.destroy.call(this, opts);
        },
        save: function (attrs, options) {
            options || (options = {});
            attrs || (attrs = _.clone(this.attributes));
            var post = _.clone(this.attributes);
            delete post.selected;
            delete post.lng;
            delete post.dontSync;
            delete post.dragabble;
            attrs.dragabble = false;
            options.data = JSON.stringify({ post: post });
            if (!this.isNew())
                options.url = this.url + this.id;
            options.contentType = "application/json";
            return Chaplin.Model.prototype.save.call(this, attrs, options);
        }
    });
    return Poi;
});
