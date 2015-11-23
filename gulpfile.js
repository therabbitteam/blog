var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var gulp = require('gulp')
var Metalsmith = require('metalsmith')
var concat = require('gulp-concat')

// Assets
var webpack = require('webpack')

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
  var sass = require('gulp-sass')
  var autoprefixer = require('gulp-autoprefixer')

  return gulp.src(path.join(__dirname, site.metalsmith.config.styleRoot, 'app.scss'))
    .pipe(sass({
      sourceComments: args.production ? false : true,
      outputStyle: args.production ? 'compressed' : 'expanded',
      includePaths: site.styles.include,
      errLogToConsole: true,
      onError: console.log
    }))
    .pipe(postcss([atImport]))
    .pipe(autoprefixer({
      browsers: site.styles.prefix,
      cascade: false
    }))
    .pipe(gulp.dest(path.join(__dirname, site.metalsmith.config.assetRoot, 'assets')))
    .pipe(connect.reload())
})

gulp.task('webpack', function(callback) {
  var webpackPlugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(args.production ? 'production' : 'development'),
      }
    })
  ]

  if (args.production) {
    webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
  }

  var webpackConfig = {
    context: path.join(__dirname, site.metalsmith.config.scriptRoot),
    entry: {
      app: './app',
      vendor: ['jquery']
    },
    output: {
      path: path.join(__dirname, site.metalsmith.config.assetRoot, 'assets'),
      filename: '[name].js'
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel?optional[]=runtime&stage=0'
        }
      ]
    },
    plugins: webpackPlugins
  }

  webpack(webpackConfig, function(err) {
    if (err) {
      return callback(err)
    }

    gulp.src('./').pipe(connect.reload())

    callback()
  })
})

gulp.task('scripts', function() {
  // TODO: Uglify javascript

  return gulp.src([
    'sources/js/jquery.min.js',
    'sources/js/skel.min.js',
    'sources/js/util.js',
    'sources/js/main.js',
    'bower_components/social-likes/social-likes.min.js'
  ])
    .pipe(concat('app.js'))
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
