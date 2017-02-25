/**
 * Nestor Vanz <nestor.vanz@gmail.com>
 */
module.exports = function() {
  var environment = process.env.NODE_ENV || "develop";
  
  var Auth = require('./auth.js');
  var cookieParser = require('cookie-parser');
  var express = require('express');
  var fs = require('fs');
  var gutil = require('gulp-util');
  var path = require('path');

  var auth = new Auth();
  var routesDir = '../routes';
  var router = express.Router();
  var src = environment == 'develop' ? 'src':'dist';

  router.use(cookieParser());
  readFiles(routesDir);

  function readFiles( dirPath ) {
    fs.readdirSync(__dirname + '/' + dirPath).forEach(function( file ) {
      registerFile(dirPath + '/' + file);
    });
  }

  function registerFile( filePath ) {
    if( filePath.indexOf('_.') == -1 ){
      var absolutePath = __dirname  + '/' + filePath;
      var isDirectory = fs.statSync(absolutePath).isDirectory();
      if (isDirectory) {
        readFiles(filePath);
      } else {
        var routes = require(filePath);
        for (var i = 0, length = routes.length; i < length; i++) {
          registerRoute( routes[i].route, routes[i].file, routes[i].public );
        }
      }
    }
  }

  function registerRoute( route, file, isPublic ) {
    if (isPublic) {
      gutil.log('Creating route', gutil.colors.cyan(route), gutil.colors.magenta('Public'));
      router.get(route, function( req, res, next ) {
        res.sendFile( path.resolve(src + file) );
      });
    } else {
      gutil.log('Creating route', gutil.colors.cyan(route));
      router.get(route, auth.verify, function( req, res, next ) {
        res.sendFile( path.resolve(src + file) );
      });
    }
  }

  router.use('*', function( req, res ) {
    res.status(404).send('Item not found.')
  });

  return router;
}
