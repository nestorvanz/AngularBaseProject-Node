(function() {
  angular.module('config.core', ['restangular', 'ui.router', 'oc.lazyLoad'])
  .config(['RestangularProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', config]);

  function config( RestangularProvider, $urlRouterProvider, $stateProvider, $locationProvider ) {
    RestangularProvider.setBaseUrl('https://jsonplaceholder.typicode.com');
    RestangularProvider.setDefaultHttpFields({ withCredentials: true });

    $locationProvider.hashPrefix('');

    // $urlRouterProvider.otherwise("/inicio");

    var states = [
      { name: 'inicio', file: '/inicio', url: '/inicio' },

      { name: 'publicacionesListado', fileRoute: '/publicaciones/list', url: '/publicaciones/list' },
      { name: 'publicacionesAgregar', fileRoute: '/publicaciones/form', url: '/publicaciones/form' },
      { name: 'publicacionesEditar', fileRoute: '/publicaciones/form', url: '/publicaciones/form/:publicacionID' },

      { name: 'tareasListado', fileRoute: '/tareas/list', url: '/tareas/list' },
      { name: 'tareasAgregar', fileRoute: '/tareas/form', url: '/tareas/form' },
      { name: 'tareasEditar', fileRoute: '/tareas/form', url: '/tareas/form/:publicacionID' }
    ];

    states.forEach(loadState);

    function controller( $scope, $stateParams, $location ) {
      $scope.params = $stateParams;
    }

    function loadState(state) {
      $stateProvider.state({
        name: state.name,
				url: state.url,
				templateUrl: state.fileRoute,
				resolve: {
					include: ['$ocLazyLoad', function( $ocLazyLoad ) {
            return $ocLazyLoad.load('/js/controllers' + state.fileRoute + '.js');
					}]
				},
        controller: ['$scope', '$stateParams', '$location', controller]
			});
    }
  }
})();
