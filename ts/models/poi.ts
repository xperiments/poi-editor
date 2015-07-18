define([
    'chaplin',
    'models/base/model'
], function(Chaplin, Model) {
        'use strict';

        var Poi = Model.extend({
            // url checking https://gist.github.com/dperini/729294
            checkUrlRegexp: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            defaults: {
                id: '',
                title: '',
                content: '',
                created_at: '',
                updated_at: '',
                lat: 0,
                long: 0,
                image_url: ''
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
            }
        });

        return Poi;
    });
