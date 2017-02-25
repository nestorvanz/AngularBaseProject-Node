module.exports = function() {
  var environment = process.env.NODE_ENV || "develop";

  var clientSessions = require("client-sessions");
  var config = require("../config/"+ environment +".json");
  var cookieParser = require('cookie-parser');
  var crypto = require('crypto');
  var http = require("http");
  var path = require("path");
  var src = environment == 'develop' ? 'src':'dist';

  var auth = {};

  auth.verify = verify;

  function sendSingInView( res ) {
    res.sendFile( path.resolve(src + config.authService.signInView) );
  }

  function verify( req, res, next ) {
    var cookieString = req.cookies[config.cookieName];
    if ( cookieString ) {
      var cookie = clientSessions.util.decode({ cookieName: config.cookieName, secret: config.authService.secretString }, cookieString);
      var options = {};

      if ( cookie && cookie.content.accessToken ) {
        options.host = config.authService.host;
        options.port = config.authService.port;
        options.path = config.authService.path;
        options.method = "GET";
        options.headers = {};
        options.headers["access-token"] = cookie.content.accessToken;
        options.headers["origin"] = 'http://localhost/:' + config.port;

        http.request(options, function( response ) {
          if ( response.statusCode == 200 ) {
            next();
          } else {
            sendSingInView( res );
          }
        }).end();
      } else {
        sendSingInView( res );
      }
    } else {
      sendSingInView( res );
    }
  }

  return auth;
};
