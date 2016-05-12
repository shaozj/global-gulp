"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gp = require('./get-path');

module.exports = function(options, page) {
  gulp.src(gp('src/page/') + page + '/' + options.main_html)
    .pipe(gulp.dest(gp('build/page/') + page));
  gutil.log(gutil.colors.green('Copy HTML: build/page/' + page + '/' + options.main_html));
};
