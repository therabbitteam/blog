var _ = require('lodash')

module.exports = plugin

function plugin(opts) {
  opts = opts || {}

  return function (files, metalsmith, done) {

    if (files) {
      for (var file in files) {

        var fileObject = files[file]

        if (_.has(fileObject, 'tag')) {
          files[file].title = 'Bài viết với tag "' + fileObject.tag + '"'
        }
      }
    }
    done()
  }
}
