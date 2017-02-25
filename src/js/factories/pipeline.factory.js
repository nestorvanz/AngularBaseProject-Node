(function() {
  'use strict';
  angular.module('factory.pipeline', [])
  .factory('Pipeline', [pipeline]);

  function pipeline() {
    return function() {
      var prototype = this;
      prototype.pipe = [];
      prototype.add = function( fun, param ){
        prototype.pipe.push({ fun: fun, param: param });
        return prototype;
      };
      prototype.run = function( param ) {
        var next, result = false;
        if ( next = prototype.pipe.splice(0, 1)[0] ) {
          result = next.fun( param || next.param, prototype.run );
        }
        return result;
      };
    }
  }
})();
