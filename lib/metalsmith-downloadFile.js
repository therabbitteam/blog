var cheerio = require('cheerio');
var async = require('async');
var downloadFile = require('./downloadFile');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};

  //var fileName = url.split('/')[url.split('/').length - 1];

  return function(files, metalsmith, done) {

    async.forEach(files, function(file, callback){
      if (!file.prismic) {
        return;
      }
      var $ = cheerio.load(file.contents.toString());

      async.series([
        function(seriesCallback) {
          $("img[data-type='prismic']").map(function() {
            var image = $(this);
            var url = $(this).attr('src');

            doDownload(url, function(){
              var filePath = generateFilePathFromUrl(url);
              $("img[data-type='prismic'][src='" + url + "']").attr('src', filePath);
            })
          });
        },
        function(){
          console.log('go here');
          var html = $.html();
          files[file.contents] = new Buffer(html);

          seriesCallback(null);
        }
      ], function(seriesCallback) {
        console.log('end async series');
        seriesCallback(null);
      }); // End async.series
    }, function(err, result){
      if (err) {
        throw new Error('Blabla');
      }
      console.log('finish here 1');
      done();
    }); // End async.forEach
  };
}

var doDownload = function(url, callback) {
  downloadFile(url, generateFilePathFromUrl(url), callback);
}

var generateFilePathFromUrl  = function(url) {
  var basePath = './';
  return basePath +  url.split('/')[url.split('/').length - 1];
}


