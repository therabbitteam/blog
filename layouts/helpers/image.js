var _ = require('lodash');
var Handlebars = require('handlebars');

module.exports = function(context, options) {

  var view = (_.has(options.hash, 'view')) ? options.hash.view : false;
  var image = context.json.main;

  if (view) {
    image = context.json.views[view];
  }

  var height = image.height;
  var width = image.width;
  var url = image.url;
  var alt = image.alt;

  var result = '<img src="'+ url +'" height="' + height + '" width="'
    + width + '" alt="' + alt + '" />';

  return new Handlebars.SafeString(result);
};
