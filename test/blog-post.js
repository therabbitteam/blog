var connect = require('gulp-connect')
var site = require('../site')
var Browser = require('./browser').Browser
var PORT = require('./browser').PORT

describe('blog post', function() {
  const browser = new Browser()

  before(function() {
    connect.server({
      root: site.metalsmith.config.destRoot,
      port: PORT
    })
  })

  before(function() {
    return browser.visit('/')
  })

  describe('connect successfully', function() {

    it('should be successful', function() {
      browser.assert.success()
    })
  })
  after(function(done) {
    connect.serverClose()
    done()
  })
})
