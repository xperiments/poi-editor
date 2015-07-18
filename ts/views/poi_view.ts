define([
  'views/base/view',
  'text!templates/poi.hbs'
], function(View, template) {
  'use strict';

  var PoiView = View.extend({

    template: template,

    autoRender: true,
    className: 'poi',
    container: '#page-container'

  });

  return PoiView;
});
