/*
 * Generate relative link to content file
 */
var slugify = require('slug')

module.exports = function(object) {
  // Posts type
  if (object.type === 'posts') {
    var title = object.data.title.json.blocks[0].text
    // TODO: Make sure this is unique
    return '/blog/' + slugify(title).toLowerCase()
  }

  // Author type
  if (object.type === 'author') {
    var name = object.data.name.json.blocks[0].text

    return '/' + slugify(name).toLowerCase()
  }
}
