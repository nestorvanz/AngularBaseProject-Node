(function() {
  angular.module('app.core')
  .controller('personasListController', ['$scope', 'Restangular', personasListController]);

  function personasListController( $scope, Restangular ) {
    var self = this;

    var publicaciones = Restangular.all('posts');

    publicaciones.getList().then(function( data ) {
      self.publicaciones = data;
      console.log(data);
    }).catch(function( res ) {
      alert(res.data);
    })
  }
})()
