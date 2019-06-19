var app = angular.module("actorApp", ["ngRoute"]);

app.config(function($routeProvider) {
  
    $routeProvider.
      when("/", {
        templateUrl: "home.html"
      }).when("/actors", {
        templateUrl: "actors.html",
        controller: "actorCtrl"
      }).when("/movies", {
        templateUrl: "movies.html",
        controller: "movieCtrl"
      }).when("/movie/:id", {
        templateUrl: "movieDtls.html",
        controller: "movieDtlsCtrl"
      }).otherwise({
        template : "<h1>error</h1>"
      });
    
  })