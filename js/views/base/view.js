define([
    'handlebars',
    'chaplin',
    'lib/view_helper'
], function (Handlebars, Chaplin) {
    'use strict';
    var View = Chaplin.View.extend({
        getTemplateFunction: function () {
            // Template compilation
            // --------------------
            var template = this.template, templateFunc = null;
            if (typeof template === 'string') {
                templateFunc = Handlebars.compile(template);
                this.constructor.prototype.template = templateFunc;
            }
            else {
                templateFunc = template;
            }
            return templateFunc;
        }
    });
    return View;
});
