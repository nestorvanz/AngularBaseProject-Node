/**
 * Nestor Vanz <vanz.mailwork@gmail.com>
 */
var gulp = require('gulp');

gulp.task('build', ['vendor', 'style', 'script']);

gulp.task('vendor', ['vendor:script', 'vendor:style']);
gulp.task('vendor:script', require('./tasks/vendor/script.js'));
gulp.task('vendor:style', require('./tasks/vendor/style.js'));

gulp.task('style', require('./tasks/style.js'));

gulp.task('script', ['script:core', 'script:signIn']);
gulp.task('script:core', require('./tasks/script/core.js'));
gulp.task('script:signIn', require('./tasks/script/sign-in.js'));

gulp.task('watch', require('./tasks/watch.js'));

gulp.task('publish', ['build', 'publish:script', 'publish:html']);
gulp.task('publish:html', require('./tasks/publish/html.js'));
gulp.task('publish:script', require('./tasks/publish/script.js'));
