var connect = require('gulp-connect')
var site = require('../site')
var Browser = require('./browser').Browser
var PORT = require('./browser').PORT
var _url = require('url')
var temp

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

    it('should click on blog post', function(done) {
      browser.clickLink('div.title a', function() {
        temp = browser.location.href
        done()
      })
    })

    it('should be at a blog post', function() {
      // Match route: /blog/:slug/
      browser.assert.url({path: /^\/blog\/[a-z0-9-]+\/$/})
      browser.assert.url(temp)
    })
  })

  describe('meta section', function() {

    it('should have title link to current url', function() {
      browser.assert.elements('div.title a', 1)

      var path = _url.parse(temp).path
      browser.assert.attribute('div.title a', 'href', path)
    })

    it('should have author', function() {
      browser.assert.elements('.meta .author', 1)
      browser.assert.elements('.meta .author .name', 1)
      browser.assert.elements('.meta .author img', 1)
    })

    it('should use small author avatar')

    it('should have date')
  })

  describe('content section', function() {

    it('should have image', function() {
      browser.assert.elements('a.image.featured', 1)
    })

    it('should have image with width and height attribute')


    it('should have content', function() {
      browser.assert.elements('div#content', 1)
      browser.assert.elements('div#content p', { atLeast: 1} )
    })


  })

  describe('footer section', function() {
    it('should have tags', function() {
      browser.assert.elements('a.icon.fa-tag', { atLeast: 1} )
      browser.assert.attribute('a.icon.fa-tag', 'href',  /^\/tag\/[a-z0-9-]+\/$/ )
    })

    it('should hav footer with class name', function() {
      browser.assert.className('footer', 'blog-post')
    })

    it('should have related posts', function() {
      browser.assert.elements('ul.related-posts li', { atLeast: 5})
    })

    it('should have social likes button', function() {
      browser.assert.elements('div.social-likes', 1)
      browser.assert.className('div.social-likes', 'social-likes social-likes_ready social-likes_visible')
      browser.assert.elements('div.social-likes__widget.social-likes__widget_facebook')
      browser.assert.elements('div.social-likes__widget.social-likes__widget_plusone')
      browser.assert.elements('div.social-likes__widget.social-likes__widget_twitter')
    })
  })

  after(function(done) {
    connect.serverClose()
    done()
  })
})
