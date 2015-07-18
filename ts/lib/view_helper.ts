define([
  'handlebars',
  'lib/utils'
], function(Handlebars, utils) {
  'use strict';

  // Application-specific Handlebars helpers
  // -------------------------------------------

  var slice = Array.prototype.slice;

  // Get Chaplin-declared named routes.
  // {{#url "like" "105"}}{{/url}}
  Handlebars.registerHelper('url', function(routeName) {
    var params = slice.call(arguments, 1);
    params.pop(); // Remove the last options argument
    var url = utils.reverse(routeName, params);
    if (url === false) {
      throw new Error('Handlebars url helper: Could not find route ' + routeName);
    }
    return url;
  });

  // Create a link passing the name of a route and params.
  // {{#link "route_name" "param1"}}Link text{{/link}}
  Handlebars.registerHelper('link', function(routeName) {
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
