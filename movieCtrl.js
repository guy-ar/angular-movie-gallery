app.controller("movieCtrl", function($scope, $http, movieSrv) {
       
    movieSrv.getMovies().then(function(movies) {
        $scope.movies = movies;
    }, function(err) {
        $log.error(err);
    });
    

    

    // Initializing variables
    $scope.movieSearchText = "";
    $scope.searchResults = [];
    $scope.favoriteMovies = [];
    let apiKey = "?api_key=bf17da39659009eb552f15e8ebda08ad";
    let prefixUrl = "https://api.themoviedb.org/3/";

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

        let movieDetailsUrl = "https://api.themoviedb.org/3/movie/" + 
          searchResult.id + apiKey;
        
        $http.get(movieDetailsUrl).then(function(res) {
            movieSrv.addMovie(
                //  need to get the following data: name, imdbId, releasedDate, length, poster, starsArr, director
                // failed to get the start and director - need to see how top get the image
                res.data.title, res.data.imdb_id, res.data.release_date, res.data.runtime, "https://image.tmdb.org/t/p/w500" + res.data.poster_path, [], "");
            
        }, function(err) {
            $log.error(err);
        })
        
        // Cleaning the search result 
        $scope.movieSearchText = "";
        $scope.searchResults = [];
    }
});