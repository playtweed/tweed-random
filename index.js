var MASK = 0xffffffff;

function Generator(seed) {
	this.seed(seed);
}

// TODO: replace with mersenne twister probably?
// MWC, from http://stackoverflow.com/a/19301306
Generator.prototype.random = function() {
	// Returns number between 0 (inclusive) and 1.0 (exclusive),
	// just like Math.random().
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & MASK;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & MASK;
    var result = ((this.m_z << 16) + this.m_w) & MASK;
    result /= 4294967296;
    return result + 0.5;
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
