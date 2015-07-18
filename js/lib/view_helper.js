define([
    'handlebars',
    'lib/utils'
], function (Handlebars, utils) {
    'use strict';
    var slice = Array.prototype.slice;
    Handlebars.registerHelper('url', function (routeName) {
        var params = slice.call(arguments, 1);
        params.pop();
        var url = utils.reverse(routeName, params);
        if (url === false) {
            throw new Error('Handlebars url helper: Could not find route ' + routeName);
        }
        return url;
    });
    Handlebars.registerHelper('link', function (routeName) {
        var params = slice.call(arguments, 1, arguments.length - 1);
        var options = arguments[arguments.length - 1];
        var url = utils.reverse(routeName, params);
        if (url === false) {
            throw new Error('Handlebars link helper: Could not find route ' + routeName);
        }
        url = Handlebars.Utils.escapeExpression(url);
        var html = '<a href="' + url + '">' + options.fn(this) + '</a>';
        return new Handlebars.SafeString(html);
    });
});
