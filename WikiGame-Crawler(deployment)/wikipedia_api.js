exports.getRandomArticle = function(success, error) {
  httpRequest({
	  host: 'en.wikipedia.org',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  path: '/w/api.php?format=json&action=query&list=random&rnnamespace=0',
	  success: success,
	  error: error
	});
}

exports.getArticleLinks = function(success, error, pageId) {
  httpRequest({
	  host: 'en.wikipedia.org',
	  path: '/w/api.php?action=query&format=json&pageids='+pageId+'&generator=links&gpllimit=max',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  success: success,
	  error: error
	});
}


var http = require('http');
var httpRequest = function(options){
	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');

	  // aggregate whole body
	  var body = '';
	  res.on('data', function (chunk) {
	    body += chunk;
	  });

	  res.on('end', function () {
	    options.success(body);
	  });
	});

	req.end();
}




