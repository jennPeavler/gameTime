var assert = require('chai').assert;
var Ball = require('../lib/ball');

var board = {
  canvas: {width: 520, height: 500},
  context: context
}

describe('Ball', function () {

  it('should be a function', function () {
    assert.isFunction(Ball);
  });

  it('the Ball function should be able to construct an object', function () {
    var ball = new Ball(board, 10, 80);
    assert.isObject(ball);
  });

  it('should have a radius of 5' ,function() {
    var ball = new Ball(board, 10, 80);
    assert.equal(ball.radius, 5);
  });

  it('should have a property with a key named x', function() {
    var ball = new Ball(board, 10, 80);
    assert.property(ball, 'x');
  });

  it('should have a property with a key named x', function() {
    var ball = new Ball(board, 10, 80);
    assert.property(ball, 'x');
  });

  it('should begin at an x position that is half the width of the canvas', function() {
    var ball = new Ball(board, 10, 80);
    assert.equal(ball.x, board.canvas.width/2);
  });

  it('should know the paddle width and height', function() {
    var ball = new Ball(board, 10, 80);
    assert.property(ball, 'paddleHeight');
    assert.property(ball, 'paddleWidth');
  });

  it('should begin at a y position that is the canvas height minus the paddle height minus the ball radius', function() {
    var ball = new Ball(board, 10, 80);
    assert.equal(ball.y, board.canvas.height - ball.paddleHeight - ball.radius);
  });

  it('should begin with an x velocity of 4 and a y velocity of -4', function() {
    var ball = new Ball(board, 10, 80);
    assert.equal(ball.dx, 4);
    assert.equal(ball.dy, -4);
  });

  it('should be able to be drawn', function() {
    var ball = new Ball(board, 10, 80);
    assert.property(ball, 'draw');
  });

  it('should move', function() {
    var ball = new Ball(board, 10, 80);
    assert.property(ball, 'move');
  });

  it('changes x when it moves', function() {
    // var obj = { val: 10 };
    // var fn = function() { obj.val = 22 };
    // assert.changes(fn, obj, 'val');
    var ball = new Ball(board, 10, 80);
    // assert.changes(move, ball, 'ball.x');
    ball.move();
    assert.notEqual(ball.x, 4);
  });

  it('changes y when it moves', function() {
    // var obj = { val: 10 };
    // var fn = function() { obj.val = 22 };
    // assert.changes(fn, obj, 'val');
    var ball = new Ball(board, 10, 80);
    // assert.changes(move, ball, 'ball.x');
    ball.move();
    assert.notEqual(ball.y, -4);
  });

});
