module.exports = function(object, showDimension) {
  if (!object) {
    return;
  }
  // TODO: Auto download and manipulate image, save it to local file
  var image = object.json.main;

  showDimension = showDimension || true;

  var height = image.height;
  var width = image.width;
  var url = image.url;
  var alt = image.alt;

  if (showDimension)
    return '<img src="'+ url +'" height="' + height + '" width="'
                + width + '" alt="' + alt + '" />';

  return '<img src="'+ url +' alt="' + alt + '" />';
}
