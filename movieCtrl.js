app.controller("movieCtrl", function($scope, movieSrv, $location) {
    
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
       
        movieSrv.getMovieDtlsApi(searchResult.id).then(function(tmdbMovie) {
            movieSrv.addMovie(
                //  need to get the following data: name, imdbId, releasedDate, length, poster, starsArr, director
                // failed to get the start and director - need to see how top get the image
                // res.data.title, res.data.imdb_id, res.data.release_date, res.data.runtime, "https://image.tmdb.org/t/p/w500" + res.data.poster_path, [], "");
                tmdbMovie.id, tmdbMovie.title, tmdbMovie.imdbId, tmdbMovie.releaesDate, 
                tmdbMovie.length, tmdbMovie.poster, [], "");
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