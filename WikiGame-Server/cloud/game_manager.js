var ready = 1;
var active = 2;
var played = 0;

var Game = Parse.Object.extend('Game');

exports.getActiveGame = function(success, error) {

	var query = new Parse.Query("Game").greaterThanOrEqualTo("status", ready).descending("status").include("source").include("winner_article").limit(1);


	query.find({
  		success: function(results) {

  			var game = new Game();
  			game.id = results[0].id;
  			if(results[0].get("status")==ready){
  				game.set("status",active);
  				game.save();	
  			}
  			var destinations = game.relation('destinations');
  			destinations.query().find({success: function(result){
  				results[1]=result;
  				success(results);
  			}});
  			
  		},
  		error: function(parseError){
  			error(parseError);
  		}
	});



}