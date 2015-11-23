module.exports = plugin

function plugin(opts) {
  opts = opts || {}

  return function (files, metalsmith, done) {

    console.log(files)
    console.log(metalsmith)

    done()
  }
}
