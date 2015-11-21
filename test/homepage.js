var connect = require('gulp-connect');
var site = require('../site');
var _ = require('lodash');
const Browser = require('zombie');

process.env.NODE_ENV = 'test';
const PORT = _.random(5000, 6000);

Browser.localhost('beta.rabbitlearn.com', PORT);

describe('home page', function() {
  const browser = new Browser();

  before(function() {
    connect.server({
      root: site.metalsmith.config.destRoot,
      port: PORT
    });
  });

  before(function() {
    return browser.visit('/');
  });

  describe('connect successfully', function() {

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see home page', function() {
      browser.assert.text('title', 'Trang chủ - Rabbit Learn');
    });
  });

  describe('have enough elements on homepage', function() {

    it('should have main div', function() {
      browser.assert.element('#main');
    });

    it('should have sidebar section', function() {
      browser.assert.element('#sidebar');
    });

    it('should have menu section', function() {
      browser.assert.element('#menu');
    });
  });

  describe('#main should have posts', function() {
    it('should have at least 2 posts', function() {
      browser.assert.elements('article', { atLeast: 2 });
    });
  });

  describe('#sidebar should widgets', function() {
    it('should have tags cloud', function() {
      browser.assert.elements('#sidebar #tags-cloud', 1);
    });

    it('should have sidebar footer', function() {
      browser.assert.elements('#sidebar #footer', 1);
    });

    it('should have sidebar about', function() {
      browser.assert.elements('#sidebar .blurb', 1);
      browser.assert.evaluate("$('#sidebar .blurb h2').text()", "About");
    });
  });

  after(function(done) {
    connect.serverClose();
    done();
  });
});
