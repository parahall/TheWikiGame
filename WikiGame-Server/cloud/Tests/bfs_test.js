// source, getAdjFn, processNodeFn, getId
exports.happyPath = function(){
	var nodes = {
			1:{id:1, neighbors: [], expectedLength: 0},
			2:{id:2, neighbors: [], expectedLength: 1},
			3:{id:3, neighbors: [], expectedLength: 1},
			4:{id:4, neighbors: [], expectedLength: 1},
			5:{id:5, neighbors: [], expectedLength: 2},
			6:{id:6, neighbors: [], expectedLength: 2},
			7:{id:7, neighbors: [], expectedLength: 2}
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
	var processNodeFn = function(node, length){
		node.length = length;
		return false;
	}

	var getIdFn = function(node){
		return node.id;
	}

	var bfs = require('cloud/bfs.js');
	bfs(source, getAdjFn, processNodeFn, getIdFn);
	bfs.process();

	var isTestPass = true;

	for (var i = 1; i <= 7; i++) {
		var node = nodes[i];
		isTestPass &= (node.expectedLength == node.length);
		console.log({id: node.id, length: node.length});
	};

	if(isTestPass)
		return 'Test Passed'
	else
		return 'Test Failed'
}

function createGraph(nodes, edges){
	edges.forEach(function(edge){
		var source = nodes[edge[0]];
		var dest = nodes[edge[1]];
		source.neighbors.push(dest.id);
	})
}
