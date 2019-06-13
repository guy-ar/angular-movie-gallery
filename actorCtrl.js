
app.controller("actorCtrl", function($scope, $http) {
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
   
    $http.get("actors.json").then(
      function (res){
        // on success
        for (let i = 0, len = res.data.length; i < len; i++) {
          $scope.actors.push(new Actor(res.data[i].fName, res.data[i].lName, 
                              res.data[i].imageUrl, res.data[i].birthday, 
                              res.data[i].imdbLink));
        }
      }, function(err) {
        // on error
        console.error(err);
      });


    
    $scope.query = "";
    
    $scope.filterQuery = function(actor) {
        let fNameUpper = actor.fName.toUpperCase();
        let lNameUpper = actor.lName.toUpperCase();
        let nameFilter = $scope.query.toUpperCase();
        
        if ((fNameUpper.includes(nameFilter)) || 
            (lNameUpper.includes(nameFilter))) {
            return true;
        }
        //$scope.selectedCard = -1;     
    }
    //$scope.selectedCard = -1;
    $scope.selectedActor = null;
    // replace the fucntion as it do not support use case where the data is filtered
    //$scope.selected = function(index) {
    $scope.selected = function(actor) {
        if ($scope.selectedActor == actor) {
          // if selecting again the same entry - unselect it
          $scope.selectedActor = null;
        } else {
          $scope.selectedActor = actor;
        }
    }
    
  });