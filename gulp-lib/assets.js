"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gp =require('./get-path');

module.exports = function(page) {
  gulp.src(gp('src/page/') + page + '/assets/**')
    .pipe(gulp.dest(gp('build/page/') + page + '/assets/'));
  gutil.log(gutil.colors.green('Copy assets: build/page/' + page + '/assets'));
};
