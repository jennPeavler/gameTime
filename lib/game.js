var Paddle = require('./paddle');
var Ball = require('./ball');
var Bricks = require('./bricks');

function Game(board) {
  this.canvas = board.canvas;
  this.context = board.context;
  this.paddle = new Paddle(board);
  this.ball = new Ball(board, this.paddle.height, this.paddle.width);
  this.bricks = new Bricks(board);
}

Game.prototype.stages = function () {
  //draw
  this.paddle.draw();
  this.paddle.move();
  this.ball.draw();
  this.ball.move();
  this.bricks.store();
  this.bricks.place();



}








module.exports = Game;
