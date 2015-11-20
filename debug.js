module.exports = plugin;

function plugin(opts) {
  opts = opts || {};

  return function (files, metalsmith, done) {

    console.log(files['index.html'].pagination.files[0].prismic);
    console.log(metalsmith);

    done();
  }
}
