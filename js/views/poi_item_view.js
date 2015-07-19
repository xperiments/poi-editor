define([
    'chaplin',
    'views/modal_view',
    'views/base/view',
    'text!templates/poi_item.hbs'
], function (Chaplin, ModalView, View, template) {
    'use strict';
    var PoiItemView = View.extend({
        template: template,
        tagName: 'li',
        className: 'poi-item',
        listen: {
            'change model': 'render'
        },
        events: {
            'click .poi-info-window': 'openInfoWindow'
        },
        openInfoWindow: function () {
            Chaplin.mediator.execute('openInfoWindow', this.model);
        }
    });
    return PoiItemView;
});
