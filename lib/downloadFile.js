var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){

  if (fileExists(filename)) {
    return callback(filename);
  }

  request.head(uri, function(err, res, body){

    //console.log('content-type:', res.headers['content-type']);
    // TODO: Refactor this. Use jobs dispatcher
    // to prevent duplicate download
    if (fileExists(filename)) {
      callback(filename);
    }
    var r = request(uri).pipe(fs.createWriteStream(filename));
    r.on('close', callback(filename));
    r.on('error', function(err){
      console.log('Error' +err);
    })
  });
};

var fileExists = function(filePath)
{
  try
  {
    return fs.statSync(filePath).isFile();
  }
  catch (err)
  {
    return false;
  }
}

module.exports.download = download;
module.exports.fileExists = fileExists;
