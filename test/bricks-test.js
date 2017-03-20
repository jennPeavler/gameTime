var assert = require('chai').assert;
var Bricks = require('../lib/bricks');

var board = {
  canvas: {width: 520, height: 500},
  context: context
}

describe('Bricks', function() {

  it('should be a function', function() {
    assert.isFunction(Bricks);
  });

  it('the Bricks function should be able to construct an object of bricks', function() {
    var bricks = new Bricks(board);
    assert.isObject(bricks);
  });

  it('the bricks object should have an empty array to store each brick in', function() {
    var bricks = new Bricks(board);
    assert.property(bricks, 'brick');
    assert.deepEqual(bricks.brick, []);
  });

  it('the bricks have a height, width, and padding', function() {
    var bricks = new Bricks(board);
    assert.property(bricks, 'height');
    assert.property(bricks, 'width');
    assert.property(bricks, 'padding');
  });

});
