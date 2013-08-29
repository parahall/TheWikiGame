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
		bfs.process(function(){
			console.log(source);
			console.log(nodes);
	    	success(nodes);
		});
		
	  },
	   function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  });
}


<<<<<<< HEAD
var getAdjFn = function(node){
	console.log("insideAdjFUnc");
	console.log(node);

=======
var getAdjFn = function(node, callback){
>>>>>>> 6ec3df1dcdca76e2962c370a7c60604d9e99ab4d
	wikiApi.getArticleLinks(function(httpResponse) {
		result = [];
		if(httpResponse.data.query)
		{
			for(link in httpResponse.data.query.pages){
				var page = httpResponse.data.query.pages[link];
				if(page.ns == 0 && page.pageid){
					result.push({id: page.pageid, title: page.title});
				}
			}	
		}
<<<<<<< HEAD
		return [];
	}, 	   
=======
		
		callback(result);
	},
>>>>>>> 6ec3df1dcdca76e2962c370a7c60604d9e99ab4d
	function(httpResponse) {
	    if(error){
	    	error('Request failed with response code ' + httpResponse.status);
	    }
	  }, 
	  getIdFn(node));
};

var randomDepth = generateUniqRandom();

var nodes = [];

var getIdFn = function(node){
		return node.id;
	}

var processNodeFn = function(node,length){
	node.length = length;
	if(randomDepth.contains(length)){
		nodes.push(node);
		randomDepth.splice(nodes.indexOf(length), 1);
		return nodes.length == 4
	}	
}

function generateUniqRandom(){
	var numbArr = [];
	for (var i = 0; i < 4; i++) {
		do {
			var numb = Math.floor((Math.random()*4)+1);
		} while (numbArr.indexOf(numb)>-1)
		numbArr[i]=numb;
	};
	console.log(numbArr);
}

Array.prototype.contains = function(obj){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === obj)
			return true;
	}

	return false;
}