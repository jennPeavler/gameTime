var assert = require('chai').assert;
var Bricks = require('../lib/Bricks');

var board = {
  canvas: {width: 520, height: 500},
  context
}

describe('Bricks', () => {
  var bricks = new Bricks(board);

  it('should be a function', () => {
    assert.isFunction(Bricks);
  });

  it('the Bricks function should be able to construct an object of bricks', () => {
    assert.isObject(bricks);
  });

  it('the bricks object should have an empty array to store each brick in', () => {
    assert.property(bricks, 'brick');
    assert.deepEqual(bricks.brick, []);
  });

  it('the bricks have a height, width, and padding', () => {
    assert.property(bricks, 'height');
    assert.property(bricks, 'width');
    assert.property(bricks, 'padding');
  });

  it('the bricks start 40 pixels from the top of the canvas', () => {
    assert.equal(bricks.topPadding, 40);
  });

  it('there are 5 rows and 5 columns of bricks', () => {
    assert.equal(bricks.rows, 5);
    assert.equal(bricks.columns, 5);
  });

  it('should store a 5 by 5 array of bricks', () => {
    bricks.store();
    for (let c = 0; c < 5; c++) {
      assert.equal(bricks.brick[c].length, 5);
    }
  });

  it('should have a method to place bricks on the canvas', () => {
    assert.property(bricks, 'place');
    assert.isFunction(bricks.place);
  });

});
