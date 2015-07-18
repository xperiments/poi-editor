define([
  'views/base/collection_view',
  'views/poi_item_view',
  'text!templates/pois.hbs'
], function(CollectionView, PoiItemView, template) {
  'use strict';

  var PoisView = CollectionView.extend({

    template: template,

    itemView: PoiItemView,

    className: 'pois',
    container: '#page-container',
    listSelector: '#poi-list',
    animationDuration: 0
  });

  return PoisView;
});
