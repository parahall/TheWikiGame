// helper method for get number of different keys in object
// using for get number of links in one article
function getObjectSize(obj){
	var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

// state
var wikiApi = {};
var Game = require('./game.js').Game;

var configuration = {
	parallelDegree: 10
}

var games = [];

// constructor
module.exports = function(){
 	wikiApi = require('./wikipedia_api.js');
}

// Generate the new game
module.exports.generateNewGame = function(success, error){
	// create games array
	for (var i = 0; i < configuration.parallelDegree; i++) {
		games[i] = new Game();
	}

	getRandomArticle(function(response) {
		var source = {
			id: response.query.random[0].id,
			title: response.query.random[0].title
		};
		var bfs = require('./bfs.js');
		bfs(source, getAdjFn, processNodeFn, getIdFn);
		bfs.process(function(){
			var processedGames = [];
	    	for (var i = 0; i < games.length; i++) {
	    		var currentGame = games[i];
	    		var destinations = currentGame.getNodes();
	    		var finalDepth = currentGame.getFinalDepth();
	    		processedGames.push({destinations: destinations,
							    		source: source,
							    		depths: finalDepth});
	    	};
	    	success(processedGames);
		});
		
	  },
	   function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  });
}

// reutrn random article with respect for number of links(must be grether than configuration.parallelDegree)
function getRandomArticle(callback){
	wikiApi.getRandomArticle(function(httpResponse) {
		var randomArticle = JSON.parse(httpResponse);
		var id = randomArticle.query.random[0].id;
		wikiApi.getArticleLinks(function(httpResponse) {
			var response = JSON.parse(httpResponse);
			if(response.query)
			{
			    var size = getObjectSize(response.query.pages);
			    console.log('size: ' + size);
			    if(size > configuration.parallelDegree){
			    	callback(randomArticle);
			    }
			    else{
			    	getRandomArticle(callback);
			    }
			}
		},null, id);
	});
}

// return array of adjacents articles
var getAdjFn = function(node, callback){
	wikiApi.getArticleLinks(function(httpResponse) {
		var response = JSON.parse(httpResponse);
		result = [];
		if(response.query)
		{
			for(link in response.query.pages){
				var page = response.query.pages[link];
				// verify using only articles with namespace = 0(main article)
				if(page.ns == 0 && page.pageid){
					result.push({id: page.pageid, title: page.title});
				}
			}	
		}
		
		callback(result);
	},
	function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  }, 
	  getIdFn(node));
};

var getIdFn = function(node){
		return node.id;
	}

// entry point for create games login
// return true if all games built, false otherwise.
var processNodeFn = function(node, length){
	node.depth = length;
	// run until the first game using the given article
	for (var i = 0; i < games.length; i++) {
		var currentGame = games[i];
		var isHandle = currentGame.processNodeFn(node, length);
		if(isHandle)
			break;
	};

	return isFinished();
}

// check if all games built succeesfully
function isFinished(){
	var result = true;
	for (var i = 0; i < games.length; i++) {
		result &= games[i].isFinished();
	};
	return result;
}