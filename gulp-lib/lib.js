"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gp = require('./get-path');

module.exports = function() {
  gulp.src(gp('src/lib/**'))
    .pipe(gulp.dest(gp('build/lib/')));
  gutil.log(gutil.colors.green('Copy libs: build/lib'));
};
