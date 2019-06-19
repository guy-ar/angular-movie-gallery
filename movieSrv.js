app.factory("movieSrv", function($log, $http, $q, convert) {

    function Movie(idOrObj, name, imdbId, releaseDate, movieLen, posterUrl, stars, director){
        // constructor may accept 2 options
        // 5 different attributes
        // or one simpleObject with all fields
        if (arguments.length > 1) {
          this.id = idOrObj;
          this.name = name;
          this.imdbId = imdbId;
          this.releaseDate = releaseDate;  
          this.length = movieLen;
          this.poster = posterUrl;
          this.stars = stars;
          this.director = director; 
        } else {
          this.id = idOrObj.id;
          this.name = idOrObj.name;
          this.imdbId = idOrObj.imdbId;
          this.releaseDate = idOrObj.releaseDate;  
          this.length = idOrObj.movieLen;
          this.poster = idOrObj.posterUrl;
          this.stars = idOrObj.stars;
          this.director = idOrObj.director;
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
        // ionitiate the data beore loading from "db"
        movies = [];
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


    function addMovie(id, name, imdbId, releaseDate, movieLen, posterUrl, stars, director) {
        let movie = new Movie(id, name, imdbId, releaseDate, movieLen, posterUrl, stars, director);
        movies.push(movie);

    }

// Adding movie (getting details from TMDB)

function getMovieDtlsFromApi(movieId) {
    let movieDetailsUrl = prefixUrl + "movie/" + 
    movieId + apiKey;
    
    let moveCreditsUrl = prefixUrl + "movie/" + 
    movieId + "/credits" + apiKey;
    
    let async = $q.defer();
    let tmdbMovie = {};
    $http.get(movieDetailsUrl).then(function(res) {
        
        // call second API to get the credits
        $http.get(moveCreditsUrl).then(function(internalRes) { 
            tmdbMovie = {"id": res.data.id,
                    "title": res.data.title,   
                    "imdbId": res.data.imdb_id,
                    "releaseDate": res.data.release_date,
                    "length": res.data.runtime,
                        "poster": "https://image.tmdb.org/t/p/w500" + res.data.poster_path
                        };
            // add the director
            let cast = internalRes.data.cast;
            let crew = internalRes.data.crew;
            for (let i = 0, len = crew.length; i < len; i++){
                if (crew[i].job =="Director") {
                    tmdbMovie.director = crew[i].name;   
                    break;
                }
            }
            tmdbMovie.stars = [];
            for (let i = 0, len = Math.min(cast.length, 5); i < len; i++){
                tmdbMovie.stars.push(cast[i].name);
            }
            // add the movie detials to the list
            
            async.resolve(tmdbMovie);
        }, function(err) {
            $log.error(err);
            async.reject();
        })
  }, function(err) {
      $log.error(err);
      async.reject();
  })
 

    return async.promise;
}


// call to getMovieDtlsFromApi() and add the movie to "DB"
function addMovieDtlsFromApi(movieId) {
            
    let async = $q.defer();
    let tmdbMovie = {};
    getMovieDtlsFromApi(movieId).then(function(tmdbMovie) {
        // add the movie detials to the list
        addMovie(
            tmdbMovie.id, tmdbMovie.title, tmdbMovie.imdbId, tmdbMovie.releaseDate, 
                tmdbMovie.length, tmdbMovie.poster, tmdbMovie.stars, tmdbMovie.director);
            async.resolve(tmdbMovie);
    }, function(err) {
            $log.error(err);
            async.reject();
    })
 

    return async.promise;
}

    return {
        getMovies: getMoviesFromJson,
        getMoviesApi: getMoviesFromTmdb,
        getMovieFromApi: getMovieDtlsFromApi,
        addMovieFromApi: addMovieDtlsFromApi
    }
});