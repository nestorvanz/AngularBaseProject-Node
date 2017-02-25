(function() {
  angular.module('app.signIn')
  .controller('signInController', ['Restangular', appController]);

  function appController( Restangular ) {
    var auth = Restangular.one('auth');
    var vm = this;

    vm.signIn = signIn;
    vm.usuario = auth;

    function signIn() {
      vm.signInError = false;
      vm.usuario.post()
      .then(function( data ) {
        // location.reload();
      }).catch(function( res ) {
        vm.signInError = true;
      });
    }
  }
})();
