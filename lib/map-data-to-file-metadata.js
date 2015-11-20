var _ = require('lodash');

module.exports = plugin;

function plugin(opts) {
  opts = opts || {};

  return function (files, metalsmith, done) {

    for(var file in files) {

      var fileObject = files[file];

      if (_.has(fileObject, 'prismic') && fileObject.layout == "blog-post.html") {
        var post = fileObject.prismic.post.results[0];
        /*
         * Map tags to file metadata
         */
        files[file].tags = post.tags;
        /*
         * Map date to file metadata
         */
        files[file].date = post.data.date.json.value;
        /*
         * Map title to file metadata
         */
        files[file].title = post.data.title.json.blocks[0].text;

      }
    }

    done();
  }
}
