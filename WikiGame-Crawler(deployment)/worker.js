Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Array.prototype.contains = function(obj){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === obj)
			return true;
	}
	return false;
}

// Const 
var Ready = 1;

var sleep = require('sleep');
var Parse = require('parse').Parse;
Parse.initialize("BqFZ7LF4ZhCyCQWLQqEIwbZlAg7HjTRWp3K2cV4D", "cV4rXLh06Py77wBJ5qWAkwrKMPcUudlWC0E5vPHl");
var Game = Parse.Object.extend("Game");
var Article = Parse.Object.extend("Article");
var config = {
	numberOfGames: 500,
	checkInterval: 60
}

console.log('start');

loop();

function loop(){
	getNumberOfGamesFromParse(generateGameLogic);
}

function generateGameLogic(numberOfGamesInParse){
	if(numberOfGamesInParse < config.numberOfGames){
			generateGame(function(games){
				games.forEach(function(game){
					saveGame(game);	
				});
				loop();
			});	
		}
		else{
			console.log('there are more than ' + config.numberOfGames + ' games in queue... sleeping for ' + config.checkInterval + ' seconds');
			sleep.sleep(config.checkInterval);
			loop();
		}
}

function getNumberOfGamesFromParse(callback){
	var query = new Parse.Query('Game');
	query.equalTo('status', Ready);
	query.count({success: function(count){
		console.log('number of ready games is: ' + count);
		callback(count);
	}});
}

function generateGame(callback){
	console.log('generate new game');

	var game_processor = require('./game_processor.js');
	game_processor();
	game_processor.generateNewGame(function(games){
		callback(games);
	});	
}

function saveGame(rawGame){
	var game = new Game();
	game.set("articles_depth", rawGame.depths);
	game.set("status", Ready);
	 
	game.save(null, {
	  success: function(game) {
	    // Execute any logic that should take place after the object is saved.
	    console.log('create game succeed, id: ' + game.id);

	    var minDepth = rawGame.depths.min();
		var destinations = game.relation("destinations");

		rawGame.destinations.forEach(function(article){
			createArticle(article, function(articleFromParse){
				destinations.add(articleFromParse);
				if(article.depth === minDepth){
					game.set("winner_article", articleFromParse);
				}
				game.save();
			});
		});
		createArticle(rawGame.source, function(source){
			game.set("source", source);
			game.save();
		});

	  },
	  error: function(game, error) {
	    console.log(game);
	    console.log(error);
	  }
	});

	
}

function createArticle(raw, success){
	var article = new Article();
	article.set("article_id", raw.id);
	article.set("title", raw.title);
	article.set("depth", raw.depth);
	article.save(null, {
		success: function(data){
			var result = new Article();
			result.id = data.id;
			success(result);
		},
		error: function(er, message){
			console.log('error');
			console.log(message);
		}
	});
}