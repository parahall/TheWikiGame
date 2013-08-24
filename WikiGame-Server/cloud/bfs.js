module.exports = function(source, getAdjFn, processNodeFn, getId){
	this.source = source;
	this.getAdjFn = getAdjFn;
	this.processNodeFn = processNodeFn;
	this.getId = getId;
}

exports.process = function(){
	var isFinished = false;
	var queue = [];
	queue.push(source);
	setLength(source,0);
	while(queue.length !== 0 & !isFinished){
		var currentNode = queue.shift();
		var adjNodes = getAdjFn(currentNode);
		for (var i = 0; i < adjNodes.length; i++) {
			if (!isMarked(getId(node))) {
				queue.push(adjNodes[i]);
				mark(adjNodes[i]);
				setLength(getLength(currentNode)+1);
			};
		};
		isFinished = this.processNodeFn(currentNode);
	}
}
var markedObjects = [];
var nodesLenght = {};
function mark(node){
	markedObjects.push(this.getId(node));
}

function isMarked(node){
	return markedObjects.indexOf(this.getId(node))>-1;
}

function setLength(node,length){
	node.length = length;
	nodesLenght[this.getId(node)] = length;
}

function getLength(node){
	return nodesLenght[nodesLenght.indexOf(this.getId(node))];
}

