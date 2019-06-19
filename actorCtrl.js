
app.controller("actorCtrl", function($scope, $log, $http, actorSrv) {
    
    // initiate the data
    $scope.actors = [];
    
    actorSrv.getActors().then(function(actors) {
      $scope.actors = actors;
    }, function(err) {
      $log.error(err);
    })
     

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