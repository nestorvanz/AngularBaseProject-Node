/**
 * Nestor Vanz <vanz.mailwork@gmail.com>
 */
module.exports = function() {

  var files = require('./../../files/publish/html.json');
  var gulp = require('gulp');
  var htmlmin = require('gulp-htmlmin');

  return gulp
    .src(files, {base: './../src/'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./../dist'));
};
