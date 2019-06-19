app.controller("movieCtrl", function($scope, movieSrv, $log, $location) {
    
    $scope.movies = [];
    movieSrv.getMovies().then(function(movies) {
        $scope.movies = movies;
    }, function(err) {
        $log.error(err);
    });
    

    

    // Initializing variables
    $scope.movieSearchText = "";
    $scope.searchResults = [];
    //$scope.favoriteMovies = [];
    
    $scope.updateSearchResults = function() {
        if ($scope.movieSearchText) {
            movieSrv.getMoviesApi($scope.movieSearchText).then(function(movies) {
                $scope.searchResults = movies;
            }, function(err) {
                $log.error(err);
            });
        
        } else {
            $scope.searchResults = [];  // This code creates a new empty array
        }
    }

    // Adding movie (getting details from TMDB)
    $scope.addMovie = function(searchResult) {
       
        movieSrv.addMovieFromApi(searchResult.id).then(function(tmdbMovie) {
            // at this point the Movie was added to list
            $log.info(JSON.stringify(tmdbMovie));
        }, function(err) {
            $log.error(err);
        })
        
        // Cleaning the search result 
        $scope.movieSearchText = "";
        $scope.searchResults = [];
    }

    $scope.getMovieDtls = function(movie) {
        $location.path("/movie/" + movie.id);
    }
});