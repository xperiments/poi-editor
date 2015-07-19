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
            'click .delete': 'delete',
            'click .poi-window': 'openInfoWindow'
        },
        'delete': function (event) {
            event.preventDefault();
            var that = this;
            var confirmDeletePoi = new ModalView({
                cb: function () {
                    var model = that.model;
                    var collection = model.collection;
                    collection.remove(model);
                    model.destroy();
                },
                title: 'Delete Poi',
                body: 'Are you sure you want to delete this item?'
            });
            confirmDeletePoi.render();
        },
        openInfoWindow: function () {
            Chaplin.mediator.execute('openInfoWindow', this.model);
        }
    });
    return PoiItemView;
});
