module.exports = function(object, width, height) {
  if (!object) {
    return;
  }
  // TODO: Auto download and manipulate image, save it to local file
  var image = object.json.main;

  height = image.height || height;
  width = width || image.width;
  var url = image.url;
  var alt = image.alt;

  return '<img src="'+ url +'" data-type="prismic" data-height="' + height + '" data-width="'
              + width + '" alt="' + alt + '" />';
};
