"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');

var gp = require('./get-path');

module.exports = function(options) {

  gulp.src(gp('build/'))
    .pipe(webserver({
      path: '/de/' + options.name + '/' + options.version + '/',
      host: '0.0.0.0',
      port: 80,
      livereload: true,
      directoryListing: {
        enable: true,
        path: gp('build/')
      },
      middleware: function(req, res, next) {
        gutil.log('Request received: ' + req.url);
        next();
      }
    }));
  gutil.log(gutil.colors.green('http://localhost/de/' + options.name + '/' + options.version + '/'));
};
