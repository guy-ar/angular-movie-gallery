app.factory("actorSrv", function($log, $http, $q, convert) {

    function Actor(fNameOrObj, lName, imageUrl, birthday, imdbLink){
        // constructor may accept 2 options
        // 5 different attributes
        // or one simpleObject with all fields
        if (arguments.length > 1) {      
        this.fName = fNameOrObj;
        this.lName = lName;  
        this.image = imageUrl;
        this.bDay = birthday;
        this.imdb = imdbLink;
        } else {
        this.fName = fNameOrObj.fName;
        this.lName = fNameOrObj.lName;  
        this.image = fNameOrObj.imageUrl;
        this.bDay = fNameOrObj.birthday;
        this.imdb = fNameOrObj.imdbLink;
        }
    };
    
    Actor.prototype.fullName = function() {
        return this.fName + " " + this.lName;
    }
    
    Actor.prototype.getAge = function() {
        return convert.calcAge(this.bDay);
    }

    let actors = [];

    function getActors(){
        // initiate the data before getting it back from DB
        actors = [];
        let async = $q.defer();

        $http.get("actors.json").then(
            function (res){
                // on success
                for (let i = 0, len = res.data.length; i < len; i++) {
                    actors.push(new Actor(res.data[i]));
                }
                // actors are ready - I can resolve the promise
                async.resolve(actors);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                async.reject(err);
            });
        return async.promise;
    }

    return {
        getActors: getActors
    }
});