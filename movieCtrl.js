app.controller("movieCtrl", function($scope, $http) {
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
       
    $scope.movies = [];

    /*
    // hard code population
    $scope.movies.push(new Movie('Avengers: Endgame', 'tt4154796', '2019', 181, 
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
            ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'], ' Anthony Russo, Joe Russo'));
        
    $scope.movies.push(new Movie('Avengers: Infinity War', 'tt4154756', '2018', 149, 
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
            ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'], ' Anthony Russo, Joe Russo'))
    */

    // read content from Json
    $http.get("movies.json").then(
        function (res){
          // on success
          for (let i = 0, len = res.data.length; i < len; i++) {
            
            $scope.movies.push(new Movie(res.data[i]));
          }
        }, function(err) {
          // on error
          console.error(err);
        });

});