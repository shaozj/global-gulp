"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gp = require('./get-path');

module.exports = function() {
  gulp.src(gp('src/res/**'))
    .pipe(gulp.dest(gp('build/res/')));
  gutil.log(gutil.colors.green('Copy res: build/res'));
};
