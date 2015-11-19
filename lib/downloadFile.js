var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){

  if (fileExists(filename)) {
    return callback();
  }

  request.head(uri, function(err, res, body){

    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    var r = request(uri).pipe(fs.createWriteStream(filename));
    r.on('close', callback);
    r.on('error', function(err){
      console.log('Error' +err);
    })
  });
};

function fileExists(filePath)
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

module.exports = download;
