var _ = require('lodash');
var Handlebars = require('handlebars');

module.exports = function(context, options) {

  var view = (_.has(options.hash, 'view')) ? options.hash.view : false;
  var image = context.json.main;

  // Don't use upscale image from Prismic
  if (view && image.width > getViewSize(context, view).width) {
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

// Get Desire view size from image object
function getViewSize(context, view) {
  if (!view || view == 'main') {
    var image = context.json.main;

    return returnImageSize(image);
  }

   var views = context.json.views;

  if (_.has(views, view)) {
    return returnImageSize(views[view]);
  }

  throw new Error('Cannot find ' + view + ' view');
}

// Return height and width
function returnImageSize(image) {
  return {
    height: image.height,
    width: image.width
  }
}
