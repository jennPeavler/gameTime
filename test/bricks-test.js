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

  it('the bricks start 40 pixels from the top of the canvas', function() {
    var bricks = new Bricks(board);
    assert.equal(bricks.topPadding, 40);
  });

  it('there are 5 rows and 5 columns of bricks', function() {
    var bricks = new Bricks(board);
    assert.equal(bricks.rows, 5);
    assert.equal(bricks.columns, 5);
  });

  it('should store a 5 by 5 array of bricks', function() {
    var bricks = new Bricks(board);
    bricks.store();
    for(c=0; c < 5; c++) {
      assert.equal(bricks.brick[c].length, 5);
    }
  });

  it('should have a method to place bricks on the canvas', function() {
    var bricks = new Bricks(board);
    assert.property(bricks, 'place');
    assert.isFunction(bricks.place);
  });

});
