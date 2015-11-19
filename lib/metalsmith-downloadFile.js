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

    async.forEachOf(files, function(file, key, callback){
      if (file.prismic) {
        console.log('-' + file.layout);
        var $ = cheerio.load(file.contents.toString());
        async.series([
          function(){
            $("img[data-type='prismic']").map(function() {
              var url = $(this).attr('src');
              console.log('--' + 'loop through image');

              doDownload(url, function(){
                var filePath = generateFilePathFromUrl(url).slice(1); // Remote . dot for root domain
                $("img[data-type='prismic'][src='" + url + "']").attr('src', filePath);

                console.log('---' + 'download image');
              })
            });
          },
          function() {
            console.log('---- replace in origin html');
            files[key].contents = new Buffer($.html());
          }
        ]);
      }
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
  var basePath = __dirname + '/../sources/images/content/';
  return basePath +  url.split('/')[url.split('/').length - 1];
}


