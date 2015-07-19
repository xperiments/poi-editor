define([
    'underscore',
    'models/base/collection',
    'models/poi'
], function(_, Collection, Poi) {
    'use strict';
    var Pois = Collection.extend({
        model: Poi,
        url: 'https://challenge-api-pedro.herokuapp.com/posts/',
    });
    return Pois;
});
