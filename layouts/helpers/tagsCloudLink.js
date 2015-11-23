var slugify = require('slug')

module.exports = function(tag) {
  return '/tag/' + slugify(tag)
}
