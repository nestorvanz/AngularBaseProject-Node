(function() {
  angular.module('app.core')
  .controller('personasFormController', ['$scope', 'Restangular', personasFormController]);

  function personasFormController( $scope, Restangular ) {
    var self = this;
    var params = $scope.params;
    var publicacion = Restangular.one('posts');

    self.submit = submit;

    if (params.publicacionID) {
      publicacion.id = params.publicacionID;
      publicacion.get(params.publicacionID).then(function(data) {
        self.publicacion = data;
      });
    }

    function submit() {
      publicacion.save().then(function( data ) {
        location.href = '#/publicaciones/list';
      });
    }
  }
})()
