var assert = require('chai').assert;
var Ball = require('../lib/ball');

var board = {
  canvas: {width: 520, height: 500},
  context: context
}

describe('Ball', function () {
  let ball = new Ball(board, 10, 80);

  it('should be a function', () => {
    assert.isFunction(Ball);
  });

  it('the Ball function should be able to construct an object', () => {
    assert.isObject(ball);
  });

  it('should have a radius of 5' , () => {
    assert.equal(ball.radius, 5);
  });

  it('should have a property with a key named x', () => {
    assert.property(ball, 'x');
  });

  it('should have a property with a key named y', () => {
    assert.property(ball, 'y');
  });

  it('should begin at an x position that is half the width of the canvas', () => {
    assert.equal(ball.x, board.canvas.width/2);
  });

  it('should know the paddle width and height',() => {
    assert.property(ball, 'paddleHeight');
    assert.property(ball, 'paddleWidth');
  });

  it('should begin at a y position that is the canvas height minus the paddle height minus the ball radius', () => {
    assert.equal(ball.y, board.canvas.height - ball.paddleHeight - ball.radius);
  });

  it('should begin with an x velocity of 4 and a y velocity of -4', () => {
    assert.equal(ball.dx, 4);
    assert.equal(ball.dy, -4);
  });

  it('should be able to be drawn', () => {
    assert.property(ball, 'draw');
  });

  it('should move', () => {
    assert.property(ball, 'move');
  });

  it('changes x when it moves', () => {
    ball.move();
    assert.notEqual(ball.x, board.canvas.width/2);
  });

  it('changes y when it moves', () => {
    ball.move();
    assert.notEqual(ball.y, board.canvas.height - this.paddleHeight - this.radius);
  });

});
