const assert = require('chai').assert;
// const $ = require('jquery');
const Game = require('../lib/game');
const Paddle = require('../lib/paddle');
const Ball = require('../lib/ball');
const Bricks = require('../lib/bricks');
const board = {
  canvas: {width: 520, height: 500},
  context
}


describe('Game', () => {
  let game = new Game(board);

  it('should be a function', () => {
    assert.isFunction(Game);
  });

  it('should create a new game object', () => {
    assert.isObject(game);
  });

  it('should have stages', () => {
    assert.property(game, 'stage')
  });

  it('should start with 3 lives', () => {
    assert.equal(game.lives, 3)
  });

  it('should start with a score of 0', () => {
    assert.equal(game.score, 0)
  });

  it('should start on level 1', () => {
    assert.equal(game.level, 1)
  });

  it('should be able to detect the left boundary', () => {
    game.ball.x = 1;
    game.ball.dx = -2;
    game.detectLeftBoundry();
    assert.equal(game.ball.dx, 2)
  });

  it('should be able to detect the right boundary', () => {
    game.ball.x = 519;
    game.ball.dx = 2;
    game.detectRightBoundry();
    assert.equal(game.ball.dx, -2)
  });

  it('should be able to detect the top boundary', () => {
    game.ball.y = 20;
    game.ball.dy = -2;
    game.detectTopBoundry();
    assert.equal(game.ball.dy, 2)
  });

  it('should bounce up when it hits the paddle', () => {
    game.ball.y = 490;
    game.ball.dy = 2;
    game.ball.x = 240;
    game.detectBottomBoundry();
    assert.equal(game.ball.dy, -2);
  });

  it.skip('should lose a life if it misses the paddle', () => {
    game.ball.y = 495;
    game.ball.dy = 2;
    game.ball.x = 2;
    game.detectBottomBoundry();
    assert.equal(game.lives, 2);
  });

  it('should be able to detect collisions', () => {
    game.ball.x = 30;
    game.ball.y = 80;
    game.bricks.brick[0][0].x = 20;
    game.bricks.brick[0][0].y = 60;
    assert.equal(game.bricks.brick[0][0].status, 1)
    game.collisionDetection();
    assert.equal(game.bricks.brick[0][0].status, 0)
    assert.equal(game.score, 1)
  });

  it('should score a point after a brick has been hit', () => {
    game.ball.x = 30;
    game.ball.y = 80;
    game.bricks.brick[0][0].x = 20;
    game.bricks.brick[0][0].y = 60;
    game.collisionDetection();
    assert.equal(game.score, 1)
  });

});
