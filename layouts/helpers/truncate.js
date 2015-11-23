var _s = require('underscore.string')

module.exports = function (content) {
  var options = {
    pruneLength: 140,
    pruneString: '...'
  }

  content = _s.stripTags(content)
  if (options.pruneLength > 0) {
    content = _s.prune(content, options.pruneLength, options.pruneString)
  }
  return content
}
