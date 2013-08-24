
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("WikiTest", function(request, response) {
	var wikiApi = require('cloud/wikipedia_api.js');
	wikiApi.getRandomArticle(function(httpResponse) {
	    console.log(httpResponse.text);
	    response.success(httpResponse.text);
	  },
	   function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status);
	  });
});
