/**
 * Nestor Vanz <vanz.mailwork@gmail.com>
 */
module.exports = function() {
  var environment = process.env.NODE_ENV || 'develop';

  var file = require('./../../files/script/sign-in.json');
  var gulp = require('gulp');
  var gulpConcat = require('gulp-concat');
  var gulpUglify = require('gulp-uglify');

  var destPath = './../' + (environment == 'develop' ? 'src' : 'dist') + file.dest;

  return gulp
    .src(file.src)
    .pipe(gulpUglify({ preserveComments: 'all' }))
    .pipe(gulpConcat(file.name))
    .pipe(gulp.dest(destPath));
};
