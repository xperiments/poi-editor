define([
  'underscore',
  'models/base/collection',
  'models/poi'
], function(_, Collection, Poi) {
  'use strict';

  var seed = [
    /*{ id: 0, name: 'DeLorean DMC-12', manufactured: 1981 },
    { id: 1, name: 'Chevrolet Corvette', manufactured: 1953 },
    { id: 2, name: 'VW Scirocco', manufactured: 1974 },
    { id: 3, name: 'Opel Manta', manufactured: 1970 },
    { id: 4, name: 'Aston Martin DB5', manufactured: 1963 },
    { id: 5, name: 'Rolls-Royce Phantom II', manufactured: 1929 },
    { id: 6, name: 'Maserati GranTurismo', manufactured: 2007 }*/
    {"id":1,"title":"Madrid","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et ultricies ante.","created_at":"2015-07-16T11:51:48.644Z","updated_at":"2015-07-16T11:51:48.644Z","lat":"40.41678","long":"-3.70379","image_url":"https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"}

  ];

  var Pois = Collection.extend({

    model: Poi,

    localStorageKey: 'pois',

    // Simple fetch logic without events, callbacks or error handling.
    fetch: function() {
      // Try to read from localStorage.
      var savedPois = window.localStorage.getItem(this.localStorageKey);
      if (savedPois) {
        savedPois = JSON.parse(savedPois);
      }

      // Only use the localStorage if there are records.
      // When all cars have been deleted, go back to start.
      var pois = savedPois && savedPois.length ? savedPois: seed;

      this.reset(pois);
    },

    save: function() {
      // Assign IDs to new model.
      var newModels = this.where({ id: undefined });
      var id = this.max(function(model) { return model.id }).id;
      _.each(newModels, function (newModel) {
        newModel.set('id', ++id);
      })
      //console.log('Cars#save', JSON.stringify(this));
      window.localStorage.setItem(this.localStorageKey, JSON.stringify(this));
    }

  });

  return Pois;
});
