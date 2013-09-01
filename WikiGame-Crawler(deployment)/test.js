// var Game = require('./game.js').Game;

// var game = new Game();
// console.log(game.getNodes());

var game_processor = require('./game_processor.js');
game_processor();
game_processor.generateNewGame(function(games){
	console.log(games);
});	

// var testGame = {
// 	destinations: [
// 		{id:1, title: 'a', depth: 7},
// 		{id:2, title: 'b', depth: 9},
// 		{id:3, title: 'c', depth: 3},
// 		{id:4, title: 'd', depth: 6},
// 	],
	
// 	source: {id:0, title: 'source'},
// 	depths: [7,9,3,6]
// }
// saveGame(testGame);


// var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);

// redis.set('foo', 'bar');

// redis.get('foo', function(err, value) {
//   console.log('foo is: ' + value);
// });

// http.get(options, function(resp){
//   resp.on('data', function(chunk){
//     //do something with chunk
//     console.log(chunk);
//   });
// });

// .on('error',function(e){
//    console.log("Error: " + hostNames[i] + "\n" + e.message); 
//    console.log( e.stack );
// });



// .on("error", function(e){
//   console.log("Got error: " + e.message);
// })