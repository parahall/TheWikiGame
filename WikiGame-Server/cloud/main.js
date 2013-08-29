
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("getGame", function(request, response) {
	var gameManager = require('cloud/game_manager.js');
	gameManager.getActiveGame(function(results) {
	    
	    console.log(results[0]);
	    console.log(results[1]);

	    response.success();
	  },
	   function(error) {
	    console.error('Request failed with response code ' + error);
	  });
});



