var MASK = 0xffffffff;

function Generator(seed) {
	this.seed(seed);
}

Generator.prototype.random = function() {
	// Returns number between 0 (inclusive) and 1.0 (exclusive),
	// just like Math.random().
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & MASK;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & MASK;
    var result = ((this.m_z << 16) + this.m_w) & MASK;
    result /= 4294967296;
    return result + 0.5;
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

var random = new Generator();
random.Generator = Generator;

module.exports = random;
