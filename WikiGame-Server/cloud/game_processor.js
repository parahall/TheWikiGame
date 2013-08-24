var wikiApi
//constructor
module.exports = function(){
 	wikiApi = require('cloud/wikipedia_api.js');
}

//Generate the new game
module.exports.generateNewGame = function(){
	wikiApi.getRandomArticle(function(article) {
		//need to take care of article
		console.log(article);
	},function(error){
		console.log(error);
	});
}


var randomDepth = generateUniqRandom();

var nodes = [];


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