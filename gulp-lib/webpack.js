"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var footer = require('gulp-footer');
var fs = require('fs');

var gp = require('./get-path');

var xtemplate = require('./xtemplate');

module.exports = function(options, page) {
  var entry = {};
  var buildFile = 'index';
  var exists = fs.existsSync(path.join(gp(''), 'src/page/' + page + '/'+buildFile+'.js'));
  if (exists) {
    entry[page] = gp('src/page/') + page + '/' + options.main_js;
  }
  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: gp('./build/page'),
      filename: '[name]/'+buildFile+'.js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }]
    },
    resolveLoader: {
      root: path.resolve(__dirname, '../node_modules')
    },
    devtool: 'source-map',
    plugins: [new webpack.optimize.DedupePlugin()]
  };

  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    // 压缩webpack生成的js文件
    fs.exists(path.join(gp(''), 'build/page/' + page + '/'+buildFile+'.js'), function(exists) {
      if (!exists) {return;}
      gulp.src(gp('build/page/') + page + '/'+buildFile+'.js')
        .pipe(uglify({
          output: {
            ascii_only: true
          }
        }))
        .pipe(rename({
          suffix: '-min'
        }))
        .pipe(footer('//# sourceMappingURL='+options.main_js+'.map'))
        .pipe(gulp.dest(gp('build/page/') + page));
      gutil.log(gutil.colors.green('Minify JS: build/page/' + page + '/'+buildFile+'-min.js'));

      xtemplate(options, page);
    });
  });
};
