var slugify = require('slug')

module.exports = function(tag) {
  if (!tag) return

  return '<a href="/tag/' + slugify(tag) + '/" class="icon fa-tag" />' + tag + '</a>'
}
