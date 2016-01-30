var MersenneTwister = require('mersenne-twister');

function Generator(seed) {
	this.generator = new MersenneTwister(seed);
}

Generator.prototype.random = function() {
    return this.generator.random();
};

Generator.prototype.integer = function(max) {
	return Math.floor(this.random() * max);
};

Generator.prototype.seed = function(seed) {
	this.m_z = 987654321;
	this.m_w = seed || 123456789;
};

Generator.prototype.choose = function(arr, remove) {
	var r = arr.length * this.random();
	if(remove) {
		return arr.splice(Math.floor(r), 1);
	} else {
		return arr[Math.floor(r)];
	}
};

// Fisher-Yates, from http://stackoverflow.com/a/2450976
Generator.prototype.shuffle = function(array) {
	var currentIndex = array.length;
	var temporaryValue;
	var randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = this.integer(currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

var random = new Generator();
random.Generator = Generator;

module.exports = random;
