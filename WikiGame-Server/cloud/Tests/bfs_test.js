// source, getAdjFn, processNodeFn, getId
exports.happyPath = function(){
	var nodes = {
			1:{id:1, neighbors: []},
			2:{id:2, neighbors: []},
			3:{id:3, neighbors: []},
			4:{id:4, neighbors: []},
			5:{id:5, neighbors: []},
			6:{id:6, neighbors: []},
			7:{id:7, neighbors: []}
		};
	var edges = [[1,2], [1,3], [1,4], [2,5], [2,6], [3,5], [3,6], [4,7], [7,2]];
	createGraph(nodes, edges);

	var source = nodes[1];
	var getAdjFn = function(node){
		var result = [];
		node.neighbors.forEach(function(id){
			result.push(nodes[id]);
		});
		return result;
	};
	var processNodeFn = function(node){
		return false;
	}

	var getIdFn = function(node){
		return node.id;
	}

	var bfs = require('cloud/bfs.js');
	bfs(source, getAdjFn, processNodeFn, getIdFn);
	bfs.process();

	for (var i = 1; i <= 7; i++) {
		var node = nodes[i];
		console.log({id: node.id, length: node.length});
	};
}

function createGraph(nodes, edges){
	edges.forEach(function(edge){
		var source = nodes[edge[0]];
		var dest = nodes[edge[1]];
		source.neighbors.push(dest.id);
	})
}
