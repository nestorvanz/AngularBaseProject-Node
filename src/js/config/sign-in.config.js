(function() {
  angular.module('config.signIn', ['restangular'])
  .config(['RestangularProvider', config]);

  function config( RestangularProvider, $urlRouterProvider, $stateProvider, $locationProvider ) {
    RestangularProvider.setBaseUrl('http://localhost:4000');
    RestangularProvider.setDefaultHttpFields({ withCredentials: true });
    console.log(RestangularProvider.defaultHeaders);
  }
})();
