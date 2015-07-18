define([
    'views/modal_view',
    'views/base/view',
    'text!templates/poi_item.hbs'
], function(ModalView, View, template) {
        'use strict';

        var PoiItemView = View.extend({

            template: template,
            tagName: 'li',
            className: 'poi-item',
            listen: {
                'change model': 'render'
            },
            events: {
                'click .delete': 'delete'
            },
            'delete': function(event) {
                event.preventDefault();
                var that = this;
                var confirmDeletePoi = new ModalView({
                    cb: function() {
                        // Shortcuts
                        var model = that.model;
                        var collection = model.collection;
                        // Remove the model from its collection. This disposes this item view.
                        collection.remove(model);
                        // Dispose the model explicitly. It shouldn’t be used elsewhere.
                        model.dispose();
                        collection.save();
                    },
                    title:'Delete Poi',
                    body: 'Are you sure you want to delete this item?'
                });
                confirmDeletePoi.render();
            }
        });

        return PoiItemView;
    });
