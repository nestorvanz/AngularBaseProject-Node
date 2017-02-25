/**
 * Nestor Vanz <nestor.vanz@gmail.com>
 */
var environment = process.env.NODE_ENV || 'develop';

var config = require('./config/'+ environment +'.json');
var Express = require('express');
var gutil = require('gulp-util');
var Router = require('./components/router.js');

var app = new Express();
var port = process.env.PORT || config.port;
var router = new Router();
var server;

app.use(router);

server = app.listen(port, function() {
  gutil.log('Server listen', gutil.colors.magenta(port));
});
