define([
    'views/base/view',
    'text!templates/modal.hbs'
], function(View, template) {
        'use strict';

        var ModalView = Backbone.View.extend({
            el: "#confirm-modal",
            events: {
                "click .btn-ok": "runCallBack"
            },
            initialize: function(args) {
                this.$el.find(".modal-title").html("<p>" + args.title + "</p>");
                this.$el.find(".modal-body").html("<p>" + args.body + "</p>");
                this.cb = args.cb;
            },
            render: function() {
                this.$el.modal("show");
            },
            close: function() {
                this.$el.modal("close");
            },
            runCallBack: function() {
                this.cb();
            }
        });

        return ModalView
    });
