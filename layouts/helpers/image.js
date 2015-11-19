module.exports = function(object, width) {
  if (!object) {
    return;
  }
  // TODO: Auto download and manipulate image, save it to local file
  var image = object.json.main;

  width = parseInt(width) || null;

  var url = image.url;
  var alt = image.alt;

  return '<img src="'+ url +'" data-type="prismic" data-width="'
              + width + '" alt="' + alt + '" />';
};
