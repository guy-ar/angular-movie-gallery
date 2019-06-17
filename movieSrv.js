app.factory("movieSrv", function($log, $http, $q, convert) {

    function Movie(nameOrObj, imdbId, releaseYear, movieLen, posterUrl, starsArr, director){
        // constructor may accept 2 options
        // 5 different attributes
        // or one simpleObject with all fields
        if (arguments.length > 1) {      
          this.name = nameOrObj;
          this.imdbId = imdbId;
          this.releasedDate = releaseYear;  
          this.length = movieLen;
          this.poster = posterUrl;
          this.starsArr = starsArr;
          this.director = director; 
        } else {
          this.name = nameOrObj.name;
          this.imdbId = nameOrObj.imdbId;
          this.releasedDate = nameOrObj.releaseYear;  
          this.length = nameOrObj.movieLen;
          this.poster = nameOrObj.posterUrl;
          this.starsArr = nameOrObj.starsArr;
          this.director = nameOrObj.director;
        }
    };
  
    Movie.prototype.min2Hour = function() {
        return convert.convertMinToHours(this.length);
    } 

    /*
    // hard code population
    $scope.movies.push(new Movie('Avengers: Endgame', 'tt4154796', '2019', 181, 
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
            ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'], ' Anthony Russo, Joe Russo'));
        
    $scope.movies.push(new Movie('Avengers: Infinity War', 'tt4154756', '2018', 149, 
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
            ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'], ' Anthony Russo, Joe Russo'))
    */

    let movies = [];

    
    function getMoviesFromJson() {
        let async = $q.defer();
         // read content from Json
        $http.get("movies.json").then(
            function (res){
                // on success
                for (let i = 0, len = res.data.length; i < len; i++) {
                    movies.push(new Movie(res.data[i]));
                }
                async.resolve(movies);
            }, function(err) {
                // on error
                $log.error(err);
                async.reject(err)
            });
        return async.promise;
    }

    // Initializing variables

    let apiKey = "?api_key=bf17da39659009eb552f15e8ebda08ad";
    let prefixUrl = "https://api.themoviedb.org/3/";

    function getMoviesFromTmdb(queryVal) {
        let async = $q.defer();
        let searchOptionActor = "search/movie";
        let searchQuery = "&query=" + queryVal;
        let fullSearchUrl = prefixUrl + searchOptionActor + apiKey + searchQuery;
        /* example for search movies
        https://api.themoviedb.org/3/search/movie?api_key=bf17da39659009eb552f15e8ebda08ad&language=en-US&query=avengers&page=1&include_adult=false
        */
    
        // example for actor: 
        /*https://api.themoviedb.org/3/search/person?api_key=53d2ee2137cf3228aefae083c8158855&query=" 
        + $scope.movieSearchText;*/

        $http.get(fullSearchUrl).then(function(res) {
            async.resolve(res.data.results);
            
        }, function(err) {
            $log.error(err);
            async.reject(err);
        })
        
        return async.promise;
    
    }


    function addMovie(nameOrObj, imdbId, releaseYear, movieLen, posterUrl, starsArr, director) {
        var movie = new Movie(nameOrObj, imdbId, releaseYear, movieLen, posterUrl, starsArr, director);
        movies.push(movie);

    }
    return {
        getMovies: getMoviesFromJson,
        getMoviesApi: getMoviesFromTmdb,
        addMovie: addMovie
    }
});