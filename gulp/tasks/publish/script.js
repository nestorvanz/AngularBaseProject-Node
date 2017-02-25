/**
 * Nestor Vanz <vanz.mailwork@gmail.com>
 */
module.exports = function() {

  var files = require('./../../files/publish/script.json');
  var gulp = require('gulp');
  var gulpUglify = require('gulp-uglify');

  return gulp
    .src(files, {base: './../src/'})
    .pipe(gulpUglify({}))
    .pipe(gulp.dest('./../dist'));
};
