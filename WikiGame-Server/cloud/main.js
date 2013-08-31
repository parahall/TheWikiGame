
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("getGame", function(request, response) {
	var gameManager = require('cloud/game_manager.js');
	gameManager.getActiveGame(function(results) {
	    response.success(results);
	  },
	   function(error) {
	    console.error('Request failed with response code ' + error);
	  });
});



