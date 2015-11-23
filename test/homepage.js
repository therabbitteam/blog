var connect = require('gulp-connect')
var site = require('../site')
var Browser = require('./browser').Browser
var PORT = require('./browser').PORT

describe('home page', function() {
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

    it('should see home page', function() {
      browser.assert.text('title', 'Trang chủ - Rabbit Learn')
    })
  })

  describe('have enough elements on homepage', function() {

    it('should have main div', function() {
      browser.assert.element('#main')
    })

    it('should have sidebar section', function() {
      browser.assert.element('#sidebar')
    })

    it('should have menu section', function() {
      browser.assert.element('#menu')
    })
  })

  describe('#main should have posts', function() {
    it('should have at least 5 posts', function() {
      browser.assert.elements('article', { atLeast: 5 })
    })

    it('should have at least 2 "read more" buttons', function() {
      browser.assert.elements('article ul.actions a.big.button', {atLeast: 5})
    })

    it('should have tags', function() {
      browser.assert.elements('a.icon.fa-tag', {atLeast: 10})
    })

    it('should featured images', function() {
      browser.assert.elements('a.image.featured', {atLeast: 2})
    })
  })

  /*
   * Test sidebar
   */
  describe('#sidebar should widgets', function() {
    it('should have tags cloud', function() {
      browser.assert.elements('#sidebar #tags-cloud', 1)
    })

    it('should have sidebar footer', function() {
      browser.assert.elements('#sidebar #footer', 1)
    })

    it('should have sidebar about', function() {
      browser.assert.elements('#sidebar .blurb', 1)
      browser.assert.text('#sidebar .blurb h2', 'About')
    })
  })

  after(function(done) {
    connect.serverClose()
    done()
  })
})
