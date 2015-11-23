var _ = require('lodash')
var truncate = require('../layouts/helpers/truncate')

module.exports = plugin

function plugin() {

  return function (files, metalsmith, done) {

    for(var file in files) {

      var fileObject = files[file]

      if (_.has(fileObject, 'prismic') && fileObject.layout === 'blog-post.html') {
        var post = fileObject.prismic.post.results[0]
        /*
         * Map tags to file metadata
         */
        files[file].tags = post.tags
        /*
         * Map date to file metadata
         */
        files[file].date = post.data.date.json.value
        /*
         * Map title to file metadata
         */
        files[file].title = post.data.title.json.blocks[0].text
        /*
         * Map description
         */
        if (_.has(post.data.description, 'json')) {
          files[file].description = post.data.description.json.value
        } else {
          files[file].description = truncate(post.data.body.html)
        }

        if (_.has(post.data.image, 'json')) {
          files[file].imageUrl = post.data.image.json.main.url
        }
      }
    }


    done()
  }
}
