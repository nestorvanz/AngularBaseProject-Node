(function() {
  angular.module('app.core')
  .controller('personasListController', ['$scope', 'Restangular', personasListController]);

  function personasListController( $scope, Restangular ) {
    var self = this;

    var tareas = Restangular.all('posts');

    tareas.getList().then(function( data ) {
      self.tareas = data;
    }).catch(function( res ) {
      alert(res.data);
    })
  }
})()
