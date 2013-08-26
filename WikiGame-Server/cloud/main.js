
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("WikiTest", function(request, response) {
	wikiApi = require('cloud/wikipedia_api.js');
	wikiApi.getArticleLinks(function(httpResponse) {
	    console.log(httpResponse.text);
	    response.success(httpResponse.text);
	  },
	   function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status);
	  },12610483);
});

Parse.Cloud.define("generateNewGame",function(request,response) {
	var game_processor = require('cloud/game_processor.js');
	game_processor();
	game_processor.generateNewGame(function(article){
		response.success(article);
	});
})

Parse.Cloud.define("test_bfs", function(request, response) {
	var bfsTest = require('cloud/Tests/bfs_test.js');
	response.success(bfsTest.happyPath());
});

Array.prototype.contains = function(obj){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === obj)
			return true;
	}

	return false;
}