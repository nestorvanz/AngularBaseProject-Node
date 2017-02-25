/**
 * Nestor Vanz <vanz.mailwork@gmail.com>
 */
module.exports = function(){
  var gulp = require('gulp');
  var rules = require('./../files/watch.json');

  gulp.watch(rules.js, ["script"]);
  gulp.watch(rules.css, ["style"]);

  return gulp;
};
