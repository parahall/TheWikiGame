/*
Representing BFS algortihm with slight changes. 
Should recieve proper configuration that contain
source = source node
getAdjFn = function that return all neighboor nodes
processNodeFn = function that stores nodes that satsfy our search criteria
getIdFn = returning id of node.
*/

var config = {};
var markedObjects = [];
var nodesLenghtMap = {};
var iteration = 0;

module.exports = function(source, getAdjFn, processNodeFn, getIdFn){
	config.source = source;
	config.getAdjFn = getAdjFn;
	config.processNodeFn = processNodeFn;
	config.getIdFn = getIdFn;
	iteration = 0;
}

/*
BFS algorithm
*/
module.exports.process = function(callback){
	var isFinished = false;
	var queue = [config.source];
	setLength(config.source,0);
	nextIteration(queue, callback);
}

// main loop iteration
function nextIteration(queue, callback){
	console.log(++iteration);
	var currentNode = queue.shift();
	config.getAdjFn(currentNode, function(adjNodes){
		for (var i = 0; i < adjNodes.length; i++) {
			var node = adjNodes[i];
			if (!isMarked(node)) {
				queue.push(node);
				mark(node);
				setLength(node, getLength(currentNode)+1);
			}
		};
		isFinished = config.processNodeFn(currentNode,getLength(currentNode));
		if(queue.length > 0 && !isFinished){
			nextIteration(queue, callback);
		}
		else{
			callback();
		}
	});
}


function mark(node){
	markedObjects.push(config.getIdFn(node));
}

function isMarked(node){
	var isMarked = markedObjects.contains(config.getIdFn(node));
	return isMarked;
}

function setLength(node, length){
	nodesLenghtMap[config.getIdFn(node)] = length;
}

function getLength(node){
	return nodesLenghtMap[config.getIdFn(node)];
}



