(function() {
  angular.module('app.core')
  .controller('appController', ['Restangular', appController]);

  function appController( Restangular ) {
    var vm = this;

    vm.signOut = signOut;

    function signOut() {
      Restangular.one('auth').remove().then(function( data ) {
        location.href = '/sign-in';
      }).catch(function( res ) {
        location.href = '/sign-in';
      });
    }
  }
})();
