var assert = require('chai').assert;
var Paddle = require('../lib/paddle');

describe('Paddle', () => {
  const board = {
                  canvas: {width: 520, height: 500},
                  context: context
                }
  const paddle = new Paddle(board);

  it('should be a function', () => {
    assert.isFunction(Paddle);
  });

  it('should construct an object', () => {
    assert.isObject(paddle);
  });

  it('should have attributes', () => {
    assert.property(paddle, 'x');
    assert.property(paddle, 'y');
    assert.property(paddle, 'width');
    assert.property(paddle, 'height');
    assert.property(paddle, 'moveRight');
    assert.property(paddle, 'moveLeft');
  });

  it('should be able to be drawn to the canvas', () => {
    assert.property(paddle, 'draw');
    assert.isFunction(paddle.draw);
  });

  it('should not move left if paddle.moveLeft is false', () => {
    assert.equal(paddle.moveLeft, false);
    paddle.move();
    assert.equal(paddle.x, board.canvas.width/2 - paddle.width/2)
  });

  it('should not move right if paddle.moveRight is false', () => {
    assert.equal(paddle.moveRight, false);
    paddle.move();
    assert.equal(paddle.x, board.canvas.width/2 - paddle.width/2)
  });

  it('should move left if paddle.moveLeft is true', () => {
    paddle.moveLeft = true;
    paddle.move();
    assert.notEqual(paddle.x, board.canvas.width/2 - paddle.width/2)
  });

  it('should move right if paddle.moveRight is true', () => {
    paddle.moveRight = true;
    paddle.move();
    assert.notEqual(paddle.x, board.canvas.width/2 - paddle.width/2);
  });
>>>>>>> master
})
