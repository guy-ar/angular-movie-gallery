app.factory("convert", function($log) {
  
    function convertMinutesToHours(len) {
      $log.info("converting " + len + " to hours...");
      let min = len % 60;
      let hour = Math.floor(len/60);
      return hour + "h " + min + "min";

    }
       
    function calculateAge(bDay) {
        $log.info("calculating age from  " + bDay);
        let date = new Date(bDay);
        let currentDate = new Date();
        let age = currentDate.getFullYear() - date.getFullYear();
        return age;
  
      }
    
    // Each service must return an object containing the functions/properties 
    // the we want to expose
    return {
      convertMinToHours : convertMinutesToHours,
      calcAge: calculateAge
    };
    
  });