function Bricks(board) {
  this.canvas = board.canvas;
  this.context = board.context;
  this.width = 80;
  this.height = 20;
  this.padding = 20;
  this.topPadding = 40;
  this.rows = 5;
  this.columns = 5;
  this.brick=[];
}

Bricks.prototype.store = function () {
  for (let c = 0; c < this.columns; c++) {
    this.brick[c] = [];
    for (let r=0; r < this.rows; r++) {
      this.brick[c][r] = {x: 0, y: 0, status: 1};
    }
  }
}

Bricks.prototype.place = function () {
  this.context.fillStyle = '#F07821';
  for (let c = 0; c < this.columns; c++) {
    for (let r = 0; r < this.rows; r++) {
      if (this.brick[c][r].status === 1) {
        this.brick[c][r].x = c * (this.width + this.padding) + this.padding;
        this.brick[c][r].y = r * (this.height + this.padding) + this.padding + this.topPadding;
        this.context.fillRect(this.brick[c][r].x, this.brick[c][r].y, this.width, this.height);
      }
    }
  }
}




module.exports = Bricks;
