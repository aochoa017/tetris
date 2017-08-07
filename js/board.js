class Board {

  constructor(xDim, yDim) {
    this.xDim = (xDim === undefined) ? 10:xDim;
    this.yDim = (yDim === undefined) ? 20:yDim;
  }

  get board() {
    var result = [];
    for (var i = 0 ; i < this.xDim; i++) {
        result[i] = [];
        for (var j = 0; j < this.yDim; j++) {
          result[i][j] = 0;
        }
    }
    return result;
  }

}
