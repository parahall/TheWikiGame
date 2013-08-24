/*
Representing BFS algortihm with slight changes. 
Should recieve proper configuration that contain
source = 
*/
var config = {};
module.exports = function(source, getAdjFn, processNodeFn, getIdFn){
	config.source = source;
	config.getAdjFn = getAdjFn;
	config.processNodeFn = processNodeFn;
	config.getIdFn = getIdFn;
}

module.exports.process = function(){
	var isFinished = false;
	var queue = [];
	queue.push(config.source);
	setLength(config.source,0);
	while(queue.length > 0 && !isFinished){
		var currentNode = queue.shift();
		var adjNodes = config.getAdjFn(currentNode);
		for (var i = 0; i < adjNodes.length; i++) {
			var node = adjNodes[i];
			if (!isMarked(node)) {
				queue.push(node);
				mark(node);
				setLength(node, getLength(currentNode)+1);
			};
		};
		isFinished = config.processNodeFn(currentNode,getLength(currentNode));
	}
}
var markedObjects = [];
var nodesLenght = {};
function mark(node){
	markedObjects.push(config.getIdFn(node));
}

function isMarked(node){
	var isMarked = markedObjects.contains(config.getIdFn(node));
	return isMarked;
}

function setLength(node,length){
	nodesLenght[config.getIdFn(node)] = length;
}

function getLength(node){
	return nodesLenght[config.getIdFn(node)];
}

Array.prototype.contains = function(obj){
	for (var i = 0; i < this.length; i++) {
		if(this[i] === obj)
			return true;
	}

	return false;
}

