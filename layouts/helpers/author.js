/*
 * Render display author field
 */

var debug = require('./debug');
var linkTo = require('./linkTo');

module.exports = function(author, authorList) {
  // TODO: Transform authors to site metadata
  // If none specific, default author will be call
  if (!author || author == undefined) return;
  
  author = author.json;

  if (author.type != 'author')
    throw new Error('This is not an author object');

  // Get author id
  var id = author.id;
  var render = 'default render';

  authorList.results.some(function(author){

    if (author.id == id) {
      var name = author.data.name.json.blocks[0].text;
      var image = author.data.avatar;

      var link = linkTo(author);

      render = '<a href="' + link + '" class="author"><span class="name">'
                + name + '</span>' + image.html+'</a>';

      return true;
    }
  });

  return render;
}
