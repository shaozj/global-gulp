var gulp = require('gulp');
var rename = require("gulp-rename");
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');

var gp = require('./get-path');


// less 转化为css 然后打包css
function buildCss() {
  var src = arguments[0];
  var dest = arguments[1];

  return 	gulp.src(src)
    .pipe(less())
    .pipe(gulp.dest(dest))
    .pipe(cssmin())
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest(dest));
}

// js打包
function buildJs() {
  var src = arguments[0];
  var dest = arguments[1];

  gulp.src(src)
    .pipe(babel({
      presets: [es2015]
    }))
    .pipe(gulp.dest(dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest(dest));
}

// copy目录
function copyPath() {
  var src = arguments[0];
  var dest = arguments[1];

  gulp.src(src)
    .pipe(gulp.dest(dest));
}

module.exports = function(cb){
  var cssSrc = [gp('src/**/*.less'), gp('src/**/*.css'), '!' + gp('src/lib/**/*')];
  var jsSrc = [gp('src/**/*.js'), '!' + gp('src/lib/**/*')];
  var copySrc = [gp('src/page/**/*.html'), gp('src/res/**/*'), gp('src/lib/**/*'), gp('src/manifest.json')];
  var dest = gp('buildLocal/');
  var copyDest = [gp('buildLocal/page'), gp('buildLocal/res'), gp('buildLocal/lib'), gp('buildLocal/')];

  buildCss(cssSrc, dest);
  buildJs(jsSrc, dest);
  for (var i = 0; i < copySrc.length; i++) {
    copyPath(copySrc[i], copyDest[i]);
  }
};
