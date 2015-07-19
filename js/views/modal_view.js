define([
    'views/base/view'
], function (View) {
    'use strict';
    var ModalView = Backbone.View.extend({
        el: "#confirm-modal",
        events: {
            "click .btn-ok": "runCallBackOk",
            "click .btn-ko": "runCallBackKo"
        },
        initialize: function (args) {
            this.$el.find(".modal-title").html("<p>" + args.title + "</p>");
            this.$el.find(".modal-body").html("<p>" + args.body + "</p>");
            this.cb = args.cb;
            this.error = args.error;
        },
        render: function () {
            this.$el.modal("show");
        },
        close: function () {
            alert(1);
            this.$el.modal("close");
        },
        runCallBackOk: function () {
            this.cb();
        },
        runCallBackKo: function () {
            this.error();
        }
    });
    return ModalView;
});
