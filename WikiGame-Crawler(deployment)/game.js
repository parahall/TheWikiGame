var configuration = {
	numberOfDestonationsArticles: 4
}

exports.Game = function(){
	this.randomDepth = generateUniqRandom();
	this.finalDepth = [];
	this.nodes = [];
}

exports.Game.prototype.getNodes = function(){
	return this.nodes;
}

exports.Game.prototype.getFinalDepth = function(){
	return this.finalDepth;
}

exports.Game.prototype.processNodeFn = function(node, length){
	console.log('length: ' + length);
	console.log(this.nodes);
	if(this.randomDepth.contains(length)){
		this.nodes.push(node);
		this.randomDepth.splice(this.randomDepth.indexOf(length), 1);
		this.finalDepth.push(length);
		return true;
	}
	return false;
}

exports.Game.prototype.isFinished = function(){
	return this.nodes.length == configuration.numberOfDestonationsArticles;
}

function generateUniqRandom(){
	var numbArr = [2,3,3,3];
	// for (var i = 0; i < configuration.numberOfDestonationsArticles; i++) {
	// 	do {
	// 		var numb = Math.floor((Math.random()*configuration.numberOfDestonationsArticles)+1);
	// 	} while (numbArr.indexOf(numb)>-1)
	// 	numbArr[i]=numb;
	// };
	return numbArr;
}