exports.getRandomArticle = function(success, error) {
  Parse.Cloud.httpRequest({
	  url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=random',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  success: success,
	  error: error
	});
}
