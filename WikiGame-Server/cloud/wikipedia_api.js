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

exports.getArticleLinks = function(success, error, pageId) {
  Parse.Cloud.httpRequest({
	  url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&pageids='+pageId+'&generator=links&gpllimit=max',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  success: success,
	  error: error
	});
}
