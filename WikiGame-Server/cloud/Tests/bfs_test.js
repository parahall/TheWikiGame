// source, getAdjFn, processNodeFn, getId
exports.happyPath = function(){
	var nodes = {
			1:{id:1, neighbors: [], expectedLength: 0},
			2:{id:2, neighbors: [], expectedLength: 1},
			3:{id:3, neighbors: [], expectedLength: 1},
			4:{id:4, neighbors: [], expectedLength: 1},
			5:{id:5, neighbors: [], expectedLength: 2},
			6:{id:6, neighbors: [], expectedLength: 2},
			7:{id:7, neighbors: [], expectedLength: 2},
			8:{id:8, neighbors: [], expectedLength: 3},
			9:{id:9, neighbors: [], expectedLength: 4},
			10:{id:10, neighbors: [], expectedLength: 5},
			11:{id:11, neighbors: [], expectedLength: 6},
			12:{id:12, neighbors: [], expectedLength: 7},
			13:{id:13, neighbors: [], expectedLength: 8},
			14:{id:14, neighbors: [], expectedLength: 9},
			15:{id:15, neighbors: [], expectedLength: 10},
			16:{id:16, neighbors: [], expectedLength: 11}
		};
	var edges = [[1,2], [1,3], [1,4], [2,5], [2,6], [3,5], [3,6], [4,7], [7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[14,16]];
	createGraph(nodes, edges);

	var source = nodes[1];

	var getAdjFn = function(node){
		var result = [];
		node.neighbors.forEach(function(id){
			result.push(nodes[id]);
		});
		return result;
	};
	
	var randomDepth = generateUniqRandom();

	var nodesRand = [];


	var processNodeFn = function(node,length){
	if(randomDepth.indexOf(length)>-1){
		nodesRand.push(node);
		if(nodesRand.length==4) {
			return true;
		}
		else {return false};
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




	var getIdFn = function(node){
		return node.id;
	}

	var bfs = require('cloud/bfs.js');
	bfs(source, getAdjFn, processNodeFn, getIdFn);
	bfs.process();

	/*
	var isTestPass = true;

	for (var i = 1; i <= 16; i++) {
		var node = nodes[i];
		isTestPass &= (node.expectedLength == node.length);
		console.log({id: node.id, length: node.length});
	};

	if(isTestPass)
		return 'Test Passed'
	else
		return 'Test Failed'
	*/
}

function createGraph(nodes, edges){
	edges.forEach(function(edge){
		var source = nodes[edge[0]];
		var dest = nodes[edge[1]];
		source.neighbors.push(dest.id);
	})
}
