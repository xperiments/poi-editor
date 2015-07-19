define([
    'underscore',
    'models/base/collection',
    'models/poi'
], function (_, Collection, Poi) {
    'use strict';
    var seed = [{ "id": 1, "title": "Madrid", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et ultricies ante.", "created_at": "2015-07-16T11:51:48.644Z", "updated_at": "2015-07-16T11:51:48.644Z", "lat": "40.41678", "long": "-3.70379", "image_url": "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg" }];
    var Pois = Collection.extend({
        model: Poi,
        url: 'https://challenge-api-pedro.herokuapp.com/posts/',
    });
    return Pois;
});
