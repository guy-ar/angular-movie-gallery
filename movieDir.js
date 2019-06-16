app.directive("myMovie", function() {
  
    return {
      // template: "<p>I am a directive :)</p>"
      templateUrl: "movieDir.html",
      restrict: "E"
    }
    
  })