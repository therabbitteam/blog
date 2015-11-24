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