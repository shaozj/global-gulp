"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var gp = require('./get-path');

module.exports = function(options, page) {
  gulp.task('test', function () {
    //gutil.colors.green('Copy libs: build/lib');
    return gulp
      .src(gp('test/**/**.html'))
      .pipe(mochaPhantomJS({
        reporter: 'list',
        mocha: {
          //grep: 'pattern'
        },
        phantomjs: {

        }
      }));
  });
};
