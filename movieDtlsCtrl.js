app.controller("movieDtlsCtrl", function($scope, $log, $routeParams, movieSrv) {
    // 332562
    $scope.id = $routeParams.id;
    movieSrv.getMovieFromApi($routeParams.id).then(function(tmdbMovie) {
        $scope.movie = tmdbMovie;
      }, function(err) {
        $log.error(err);
      });
});