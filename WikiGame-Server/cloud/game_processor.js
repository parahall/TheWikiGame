var wikiApi = {};
//constructor
module.exports = function(){
 	wikiApi = require('cloud/wikipedia_api.js');
}

//Generate the new game
module.exports.generateNewGame = function(success, error){

	wikiApi.getRandomArticle(function(httpResponse) {
		//console.log(httpResponse.data.query);
		var source = {
			id: httpResponse.data.query.random[0].id,
			title: httpResponse.data.query.random[0].title
		};
		var bfs = require('cloud/bfs.js');
		bfs(source, getAdjFn, processNodeFn, getIdFn);
		bfs.process();
		console.log(nodes);
	    success(source);
	  },
	   function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  });
}


var getAdjFn = function(node){

	wikiApi.getArticleLinks(function(httpResponse) {
		for(link in httpResponse.data.query.pages){
			console.log(link);
		}

	}, 	   
	function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  }, 
	  getIdFn(node));
	return [];
};

var randomDepth = generateUniqRandom();

var nodes = [];

var getIdFn = function(node){
		return node.id;
	}

var processNodeFn = function(node,length){
	if(randomDepth.contains(length)){
		nodes.push(node);
		if(nodes.length==4) return true;
		else false;
	}	
}

function generateUniqRandom(){
	var numbArr = [];
	for (var i = 0; i < 4; i++) {
		do {
			var numb = Math.floor((Math.random()*10)+1);
		} while (numbArr.indexOf(numb)>-1)
		numbArr[i]=numb;
	};
	return numbArr;
}

Array.prototype.contains = function(obj){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === obj)
			return true;
	}

	return false;
}