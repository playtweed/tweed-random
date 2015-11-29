# tweed-random

## Usage

If you're not doing anything fancy, tweed-random can be just used as a module, like this:

```javascript
var random = require('tweed-random');
random.seed(12345); // optional
console.log(random.random());
```

Or if you need multiple concurrent seeded generators, like this:

```javascript
var random = require('tweed-random');
var gen1 = new random.Generator();
var gen2 = new random.Generator(123);
console.log(gen1.random());
console.log(gen2.random());
```

All functions available on a generator are available as static functions on
the module, and vice versa.

## Extra methods

`choose(arr, [remove])`: return a random element of `arr`, optionally removing that element from the array.
