class Bricks {
  constructor (board) {
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

  store() {
    for (let c = 0; c < this.columns; c++) {
      this.brick[c] = [];
      for (let r = 0; r < this.rows; r++) {
        this.brick[c][r] = {x: 0, y: 0, status: 1};
      }
    }
  }

  place (item) {
    this.context.fillStyle = '#F07821'
    if(Array.isArray(item)) {
      item.forEach(function(element) {
        this.place(element);
      })
    }
    else {
      if (item.status === 1) {
        item.x = item.indexOf(item) * (this.width + this.padding) + this.padding;
        item.y = item.indexOf(item) * (this.height + this.padding) + this.padding + this.topPadding;
        this.context.fillRect(item.x, item.y, this.width, this.height);
      }
    }
  }



}

module.exports = Bricks;
