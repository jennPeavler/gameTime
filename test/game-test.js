const assert = require('chai').assert;
const Game = require('../lib/game');
const Paddle = require('../lib/paddle');
const Ball = require('../lib/ball');
const Bricks = require('../lib/bricks');
const board = {
  canvas: {width: 520, height: 500},
  context: context
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
    game.stages()
    console.log(game.stage)
    assert.property(game.stage, 'initiate')
  });
});
