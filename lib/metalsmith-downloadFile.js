var cheerio = require('cheerio');
var async = require('async');
var downloadFile = require('./downloadFile');
var gm = require('gm');
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
        var $ = cheerio.load(file.contents.toString());
        $("img[data-type='prismic']").map(function () {
          var url = $(this).attr('src');
          var width = $(this).attr('data-width');

          doDownload(url, function (filePath) {
            var fileUrl = generateFilePathFromUrl(url, true);

            var options = {
              filePath: filePath,
              width: parseInt(width)
            };

            $("img[data-type='prismic'][src='" + url + "']")
              .attr('src', filePath)

            resize(options, function(resizedPath) {
              $("img[data-type='prismic'][src='" + url + "']")
                .attr('src', convertLocalPathToUrl(resizedPath))
            });
          })
        });
        console.log('---- replace in origin html');
        files[key].contents = new Buffer($.html());
      }
      callback()
    }, function(){
      console.log('callback');
      done();
    });

  };
}

var doDownload = function(url, callback) {
  downloadFile.download(url, generateFilePathFromUrl(url), callback);
}

var generateFilePathFromUrl  = function(url, forWeb) {
  var basePath = (!forWeb)? process.cwd() + '/sources/images/content/' : '/images/content/';
  return basePath +  url.split('/')[url.split('/').length - 1];
}

var convertLocalPathToUrl = function(url) {
  return url.replace(process.cwd() , '');
}

var resize = function(options, callback) {
  var resizedPath = options.filePath.replace(/\.(gif|jpg|jpeg|tiff|png)$/i, '_' + options.width + '.$1');

  if (downloadFile.fileExists(resizedPath)) {
    return callback(resizedPath);
  }

  gm(options.filePath)
    .resize(parseInt(options.width), null )
    .write(resizedPath, function(err) {
      if (err)
        throw new Error('Error while resizing image: ' + err);

      callback(resizedPath);
    })
}



