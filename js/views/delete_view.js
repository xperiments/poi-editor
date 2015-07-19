define([
    'chaplin',
    'views/modal_view',
], function (Chaplin, ModalView) {
    'use strict';
    var DeleteView = Backbone.View.extend({
        initialize: function (args) {
            console.log(this);
            var that = this;
            var confirmDeletePoi = new ModalView({
                cb: function (a) {
                    var model = that.model;
                    model.destroy({
                        success: function () {
                            Chaplin.utils.redirectTo({ name: 'pois' });
                        }
                    });
                },
                error: function () {
                    Chaplin.utils.redirectTo({ name: 'pois' });
                },
                title: 'Delete Poi',
                body: 'Are you sure you want to delete this item?'
            });
            confirmDeletePoi.render();
        }
    });
    return DeleteView;
});
