var _ = require('lodash');

module.exports = plugin;

function plugin(opts) {
  opts = opts || {};

  return function (files, metalsmith, done) {

    for(var file in files) {

      var fileObject = files[file];

      if (_.has(fileObject, 'prismic') && fileObject.layout == "blog-post.html") {
        /*
         * Map tags to file metadata
         */
        files[file].tags = fileObject.prismic.post.results[0].tags;
        /*
         * Map date to file metadata
         */
        files[file].date = fileObject.prismic.post.results[0].data.date.json.value;
      }
    }

    done();
  }
}
