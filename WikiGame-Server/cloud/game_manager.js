var ready = 1;
var active = 2;
var played = 0;

var Game = Parse.Object.extend('Game');

exports.getActiveGame = function(success, error) {

	var query = new Parse.Query("Game").greaterThanOrEqualTo("status", ready).descending("status").include("source").include("winner_article").limit(2);


	query.find({
  		success: function(results) {

  			var game = new Game();
        var d = new Date();
        var timeStamp =  d.getTime()
        var index = 0;
        
        if(((120*1000)-(timeStamp-results[index].get("active_time")))<=0){
            
            game.id = results[index].id;
            game.set("status",played);
            game.save();
            index = 1;
        }
        game.id = results[index].id;
  			if(results[index].get("status")==ready){
  				game.set("status",active);

          game.set("active_time",timeStamp);
          results[index].set("active_time",timeStamp); 

  				game.save();	
  			} 

        var gameInJSon = results[index].toJSON();
        gameInJSon.source = results[index].get("source");
        gameInJSon.winner_article = results[index].get("winner_article");

  			var destinations = game.relation('destinations');
  			destinations.query().find({success: function(result){
  			gameInJSon.destinations=result;
  				success(gameInJSon);
  			}});

        


  			
  		},
  		error: function(parseError){
  			error(parseError);
  		}
	});



}