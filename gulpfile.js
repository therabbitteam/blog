var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var gulp = require('gulp')
var Metalsmith = require('metalsmith')
var concat = require('gulp-concat')
var mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: true
})

// Site
var site = require('./site')

// Handlebars
var Handlebars = require('handlebars')
// Add handlebars helpers
require('./lib/handlebars')(Handlebars)

// Metalsmith
var connect = require('gulp-connect')

// Configuration
var args = {
  build: !!argv.build,
  production: !!argv.production
}
function setupMetalsmith(callback) {
  var ms = new Metalsmith(process.cwd())
  var msconfig = site.metalsmith || {}

  var msplugins = msconfig.plugins || {}
  ms.source(msconfig.config.contentRoot)
  ms.destination(msconfig.config.destRoot)

  ms.metadata(msconfig.metadata)

  Object.keys(msplugins).forEach(function(key) {
    var plugin = require(key)
    var options = msplugins[key]

    if (options._metalsmith_if !== undefined) {
      var condition = false
      if (options._metalsmith_if === 'production') {
        condition = argv.production
      } else if (options._metalsmith_if === 'build') {
        condition = argv.build
      }

      if (condition) {
        options._metalsmith_if = undefined
        delete options._metalsmith_if
        ms.use(plugin(options))
      }
    } else {
      ms.use(plugin(options))
    }
  })
  ms.build(function(err) {
    if (err) {
      console.log(err)
      return callback(err)
    }
    gulp.src('./').pipe(connect.reload())
    callback()
  })
}


//Gulp tasks

gulp.task('metalsmith', function(callback) {
  setupMetalsmith(callback)
})

gulp.task('vendor', function() {
  gulp.src(site.vendor)
    .pipe(gulp.dest(path.join(__dirname, site.metalsmith.config.assetRoot, 'vendor')))
    .pipe(connect.reload())
})

gulp.task('styles', function() {
  var postcss = require('gulp-postcss')
  var atImport = require('postcss-import')
  var atImportUrl = require('postcss-import-url')
  var sass = require('gulp-sass')
  var autoprefixer = require('gulp-autoprefixer')
  var pixrem = require('pixrem')
  var cssnano = require('cssnano')

  /*
   * PostCSS plugins section
   */
  var postCSS = [atImport, atImportUrl, pixrem]
  var postCSS_production = [cssnano]
  if (args.production) {
    postCSS = postCSS.concat(postCSS_production)
  }

  return gulp.src(path.join(__dirname, site.metalsmith.config.styleRoot, 'app.scss'))
    .pipe(sass({
      sourceComments: args.production ? false : true,
      includePaths: site.styles.include,
      errLogToConsole: true,
      onError: console.log
    }))
    .pipe(postcss(postCSS))
    .pipe(autoprefixer({
      browsers: site.styles.prefix,
      cascade: false
    }))
    .pipe(gulp.dest(path.join(__dirname, site.metalsmith.config.assetRoot, 'assets')))
    .pipe(connect.reload())
})

gulp.task('scripts', function() {
  var uglify = require('gulp-uglify')

  return gulp.src(site.scripts)
    .pipe(concat('app.js'))
    .pipe(mode.production(uglify()))
    .pipe(gulp.dest('./sources/assets'))
})

gulp.task('watch', ['default'], function() {
  gulp.watch(['gulpfile.js', 'site.js'], ['default'])
  gulp.watch([site.metalsmith.config.styleRoot+'/**/*'], ['styles'])
  //gulp.watch([site.metalsmith.config.scriptRoot+'/**/*'], ['scripts']);
  gulp.watch([
    site.metalsmith.config.contentRoot+'/**/*',
    site.metalsmith.config.layoutRoot+'/**/*',
    site.metalsmith.config.assetRoot+'/**/*'
  ], ['metalsmith'])
})
gulp.task('server', ['default', 'watch'], function() {
  connect.server({
    root: site.metalsmith.config.destRoot,
    livereload: true
  })
})

gulp.task('connect', function() {
  connect.server({
    root: site.metalsmith.config.destRoot,
    livereload: true
  })
})

gulp.task('default', ['vendor', 'styles', 'scripts', 'metalsmith'])
