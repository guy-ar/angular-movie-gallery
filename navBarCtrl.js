app.controller("navBarCtrl", function($scope, $log, $location) {
    $scope.currentUrl = $location.path();
});