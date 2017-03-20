var assert = require('chai').assert
var Paddle = require('../lib/paddle')
var board = {
            canvas: {width: 520, height: 500},
            context: context
            }

// require('locus');

describe('Paddle', function () {
  it('should be a function', function () {
    assert.isFunction(Paddle);
  });

  it('should be an object', function () {
    var paddle = new Paddle(board);
    assert.isObject(paddle);
  })

  it('should be able to move left', function () {
    var paddle = new Paddle(board);
    paddle.move();
    assert.equal(paddle.x, 219)
  });

  //it should be able to move right
})
