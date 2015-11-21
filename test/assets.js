//var connect = require('gulp-connect');
//var site = require('../site');
//var _ = require('lodash');
//const browser = require('zombie');
//
//process.env.NODE_ENV = 'test';
//const PORT = _.random(5000, 6000);
//
//browser.localhost('example.com', PORT);
//
//describe('asset files', function() {
//
//  before(function() {
//    connect.server({
//      root: site.metalsmith.config.destRoot,
//      port: PORT
//    });
//  });
//
//  it('should export app.js', function() {
//    browser.visit('/assets/app.js');
//    browser.assert.success();
//  });
//  it('should export vendor.js');
//  it('should export app.css');
//
//  after(function(done) {
//    connect.serverClose();
//    done();
//  });
//});
