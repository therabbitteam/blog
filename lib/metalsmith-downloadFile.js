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

    async.each(files, function(file, callback){
      if (!file.prismic) {
        return;
      }
      var $ = cheerio.load(file.contents.toString());

      $("img[data-type='prismic']").map(function() {
        var image = $(this);
        var url = $(this).attr('src');

        doDownload(url, function(){
          var filePath = generateFilePathFromUrl(url);
          $("img[data-type='prismic'][src='" + url + "']").attr('src', filePath);

          var html = $.html();
          files[file.contents] = new Buffer(html);
        })
      });

      callback()
    }, function(){
      console.log('callback');
      done();
    });

  };
}

var doDownload = function(url, callback) {
  downloadFile(url, generateFilePathFromUrl(url), callback);
}

var generateFilePathFromUrl  = function(url) {
  var basePath = './';
  return basePath +  url.split('/')[url.split('/').length - 1];
}


