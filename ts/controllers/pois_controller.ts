define([
  'controllers/base/controller',
  'models/pois',
  'models/poi',
  'views/pois_view',
  'views/poi_view',
  'views/edit_poi_view'
], function(Controller, Pois, Poi, PoisView, PoiView, EditPoiView) {
  'use strict';

  var PoisController = Controller.extend({

    beforeAction: function () {
      // Create a new Pois collection or preserve the existing.
      // This prevents the Pois collection from being disposed
      // in order to share it between controller actions.
      var pois = this.reuse('pois', Pois);

      // Fetch collection from storage if it’s empty.
      if (pois.length == 0) {
        pois.fetch();
      }
    },

    index: function() {
      //console.log('PoisController#index');
      var pois = this.reuse('pois');
      this.view = new PoisView({ collection: pois });
    },

    show: function(params) {
      //console.log('PoisController#show');
      var pois = this.reuse('pois');
      var poi = pois.get(params.id);

      this.view = new PoiView({ model: poi });
    },

    edit: function(params) {
      //console.log('PoisController#edit');
      var pois = this.reuse('pois');
      var poi = pois.get(params.id);
      this.view = new EditPoiView({ model: poi, collection: pois });
    },

    'new': function() {
      //console.log('PoisController#new');
      var poi = new Poi();
      var pois = this.reuse('pois');
      this.view = new EditPoiView({ model: poi, collection: pois });
    }

  });

  return PoisController;
});
