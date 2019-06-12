
app.controller("actorCtrl", function($scope) {
    function Actor(fName, lName, imageUrl, birthday, imdbLink){
      this.fName = fName;
      this.lName = lName;  
      this.image = imageUrl;
      this.bDay = birthday;
      this.imdb = imdbLink;
    };
    
    Actor.prototype.fullName = function() {
      return this.fName + " " + this.lName;
    }
    
    $scope.actors = [];
    $scope.actors.push(new Actor("Robert", "Downey Jr.", "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg",
    "1965-04-04", "https://www.imdb.com/name/nm0000375/"));
    $scope.actors.push(new Actor("Angelina", "Jolie", 
    "https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_SY1000_CR0,0,812,1000_AL_.jpg"
    , "1975-06-04", "https://www.imdb.com/name/nm0001401/"));
    $scope.actors.push(new Actor("Al", "Pacino", "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_.jpg",
    "1940-04-25", "https://www.imdb.com/name/nm0000199/"));
    $scope.actors.push(new Actor("Clint", "Eastwood", "https://m.media-amazon.com/images/M/MV5BMTg3MDc0MjY0OV5BMl5BanBnXkFtZTcwNzU1MDAxOA@@._V1_SY1000_CR0,0,740,1000_AL_.jpg",
    "1930-05-31", "https://www.imdb.com/name/nm0000142/"));
    $scope.actors.push(new Actor("Brie", "Larson", "https://m.media-amazon.com/images/M/MV5BMjExODkxODU3NF5BMl5BanBnXkFtZTgwNTM0MTk3NjE@._V1_SY1000_CR0,0,721,1000_AL_.jpg",
    "1989-10-01", "https://www.imdb.com/name/nm0488953/"));
    $scope.actors.push(new Actor("Samuel", "L. Jackson", "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
    "1948-12-21", "https://www.imdb.com/name/nm0000168/"));
    $scope.actors.push(new Actor("Scarlett", "Johansson", "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_SY1000_CR0,0,824,1000_AL_.jpg",
    "1948-12-21", "https://www.imdb.com/name/nm0424060/"));
    $scope.actors.push(new Actor("Nicole", "Kidman", "https://m.media-amazon.com/images/M/MV5BMTk1MjM5NDg4MF5BMl5BanBnXkFtZTcwNDg1OTQ4Nw@@._V1_SX738_CR0,0,738,999_AL_.jpg",
    "1948-12-21", "https://www.imdb.com/name/nm0000173/"));
  
    
    $scope.query = "";
    
    $scope.filterQuery = function(actor) {
        let fNameUpper = actor.fName.toUpperCase();
        let lNameUpper = actor.lName.toUpperCase();
        let nameFilter = $scope.query.toUpperCase();
        
        if ((fNameUpper.includes(nameFilter)) || 
            (lNameUpper.includes(nameFilter))) {
            return true;
        }
    }
    
  });