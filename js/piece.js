class Piece {

  constructor(type, pos) {
    console.log("Soy el constructor de Piece");
    this.cubeClassInit = "tetris-cube";
    this.cube = [];
    this.type = (type === undefined) ? 0:type;
    this.setColor(type);
    if(pos === undefined){
      this.generator(this.type);
      console.log("pos undefined");
      this.putPieceInBoard();
      console.log(this.pos[0].y);
    } else {
      this.pos = pos;
      console.log(this.pos[0].y);
      this.setPieceInBoard();
    }

  }

  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  setColor(typeValue) {
    switch (typeValue) {
      case 0:
        this.color = "blue";
        break;
      case 1:
        this.color = "yellow";
        break;
      case 2:
        this.color = "green";
        break;
      case 3:
        this.color = "purple";
        break;
      case 4:
        this.color = "blue2";
        break;

      default:
        break;
    }
  }

  generator(typeValue) {console.log("generator");

    switch (typeValue) {
      case 0:

        // this.color = "blue";
        this.xUnits = 4;
        this.yUnits = 1;

        this.pos = [
          {
            "x":3,
            "y":19
          },
          {
            "x":4,
            "y":19
          },
          {
            "x":5,
            "y":19
          },
          {
            "x":6,
            "y":19
          }
        ];

        break;

      case 1:

        // this.color = "yellow";
        this.xUnits = 2;
        this.yUnits = 2;

        this.pos = [
          {
            "x":4,
            "y":18
          },
          {
            "x":4,
            "y":19
          },
          {
            "x":5,
            "y":18
          },
          {
            "x":5,
            "y":19
          }
        ];

        break;

      case 2:

        // this.color = "green";
        this.xUnits = 3;
        this.yUnits = 2;

        this.pos = [
          {
            "x":4,
            "y":19
          },
          {
            "x":5,
            "y":19
          },
          {
            "x":5,
            "y":18
          },
          {
            "x":6,
            "y":18
          }
        ];

        break;

      case 3:

        // this.color = "purple";
        this.xUnits = 3;
        this.yUnits = 2;

        this.pos = [
          {
            "x":4,
            "y":19
          },
          {
            "x":5,
            "y":19
          },
          {
            "x":6,
            "y":19
          },
          {
            "x":5,
            "y":18
          }
        ];

        break;

      case 4:

        // this.color = "blue2";
        this.xUnits = 3;
        this.yUnits = 2;

        this.pos = [
          {
            "x":4,
            "y":19
          },
          {
            "x":5,
            "y":19
          },
          {
            "x":6,
            "y":19
          },
          {
            "x":4,
            "y":18
          }
        ];

        break;

      default:
        break;
    }

  }

  setPieceInBoard() {
    this.cube[0] = document.getElementById("cube-" + this.pos[0].x + "-" + this.pos[0].y);
    this.cube[1] = document.getElementById("cube-" + this.pos[1].x + "-" + this.pos[1].y);
    this.cube[2] = document.getElementById("cube-" + this.pos[2].x + "-" + this.pos[2].y);
    this.cube[3] = document.getElementById("cube-" + this.pos[3].x + "-" + this.pos[3].y);
  }

  putPieceInBoard() {

    this.setPieceInBoard();

    var cubeClass = this.cubeClassInit + " bg-" + this.color;
    this.cube[0].setAttribute('class', cubeClass);
    this.cube[1].setAttribute('class', cubeClass);
    this.cube[2].setAttribute('class', cubeClass);
    this.cube[3].setAttribute('class', cubeClass);

  }

  hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  isCubeInBoard(posNew) {
    if (posNew["x"] > -1 && posNew["x"] <= 9
    && posNew["y"] > -1 && posNew["y"] <= 19) {
      return true;
    }
    return false
  }

  isMoveValid(posNew) {

    var retValue = false;

    if ( this.isCubeInBoard(posNew) ) {
      var cube = document.getElementById("cube-" + posNew["x"] + "-" + posNew["y"]);
      if(!this.hasClass(cube, "cube-stop") ) {
        retValue = true;
      }
    }

    return retValue;

  }

  stopPiece() {
    for (var i = 0; i < this.pos.length; i++) {
      var cube = document.getElementById("cube-" + this.pos[i].x + "-" + this.pos[i].y);
      if(!this.hasClass(cube, "cube-stop") ) {
        cube.setAttribute('class', cube.getAttribute("class") + " cube-stop");
      }
    }
  }

  move(dirValue) {

    console.log(this.pos);

    var moveValid = true;
    var notValidButContinue = false;
    var noMoreMoveY = false;
    var posNew = [];
    var posOld = [];
    var reverseFor = false;
    if(dirValue.y > 0) {
      reverseFor = true;
    }

    for (var k = 0; k < this.pos.length; k++) {
      if(!reverseFor) {
        var i = k;
      } else {
        var i = (this.pos.length - 1) - k;
      }

      posOld[i] = [];
      posOld[i]["x"] = this.pos[i].x;
      posOld[i]["y"] = this.pos[i].y;

      posNew[i] = [];
      posNew[i]["x"] = posOld[i]["x"] + dirValue.x;
      posNew[i]["y"] = posOld[i]["y"] + dirValue.y;

      if( this.isCubeInBoard(posNew[i]) ) {
        var cube = document.getElementById("cube-" + posNew[i]["x"] + "-" + posNew[i]["y"]);
        console.log(posNew);
        if(!this.hasClass(cube, "cube-stop") ) {
          moveValid = true;
        } else {
          moveValid = false;
          break;
        }
      } else {
        moveValid = false;
        if(posNew[i]["y"] < 0) {
          noMoreMoveY = true;
        } else {
          notValidButContinue = true;
        }

        break;
      }

    }

    if (moveValid) {
      this.savePos(posNew);
      this.remplaceCube(posOld, posNew);
      return true;

    } else {
      this.isCompleteLine(posOld);
      console.log("NOT moveValid");
      if(noMoreMoveY) {
        console.log("pero llega aqui");
        this.stopPiece();
        return false;
      } else if (!notValidButContinue) {
        this.savePos(posOld);
        console.log("!notValidButContinue");
        this.stopPiece();
        return false;
      } else{
        this.savePos(posOld);
        return true;
      }
    }

  }

  turnPiece() {
    var posOld = [];
    var posNew = [];
    var moveValid = true;
    var posAct;
    var posDif = [];
    for (var i = 0; i < this.pos.length; i++) {
      posOld[i] = [];
      posNew[i] = [];
      posOld[i]["x"] = this.pos[i].x;
      posOld[i]["y"] = this.pos[i].y;
      posDif[i] = [];
    }

    switch (this.type) {
      case 0:

        posDif[1]["x"] = (posOld[1]["x"]);
        posDif[1]["y"] = (posOld[1]["y"]);

        if( posOld[1]["x"] == posOld[0]["x"]
        && posOld[2]["x"] == posOld[0]["x"]
        && posOld[3]["x"] == posOld[0]["x"]) {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] + 2);
          posDif[3]["y"] = (posOld[3]["y"] - 2);

        } else {

          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] - 2);
          posDif[3]["y"] = (posOld[3]["y"] + 2);

        }

        for (var i = 0; i < posDif.length; i++) {
          posNew[i]["x"] = posDif[i]["x"];
          posNew[i]["y"] = posDif[i]["y"];
          if(!this.isMoveValid(posNew[i])) {
            moveValid = false;
            break;
          }
        }

        break;

      case 2:

        posDif[1]["x"] = (posOld[1]["x"]);
        posDif[1]["y"] = (posOld[1]["y"]);

        if( posOld[1]["y"] == posOld[0]["y"]) {
          /*
              ==
                ||
                  ==
           */


          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] - 2);
          posDif[3]["y"] = (posOld[3]["y"]);

        } else {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] + 2);
          posDif[3]["y"] = (posOld[3]["y"]);

        }

        for (var i = 0; i < posDif.length; i++) {
          posNew[i]["x"] = posDif[i]["x"];
          posNew[i]["y"] = posDif[i]["y"];
          if(!this.isMoveValid(posNew[i])) {
            moveValid = false;
            break;
          }
        }

        break;

      case 3:

        posDif[1]["x"] = (posOld[1]["x"]);
        posDif[1]["y"] = (posOld[1]["y"]);

        if( posOld[1]["x"] == posOld[3]["x"] && posOld[1]["y"] > posOld[3]["y"] ) {

          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] + 1);
          posDif[3]["y"] = (posOld[3]["y"] + 1);

        } else if( posOld[1]["y"] == posOld[3]["y"] && posOld[1]["x"] < posOld[3]["x"] ) {

          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] - 1);
          posDif[3]["y"] = (posOld[3]["y"] + 1);

        } else if( posOld[1]["x"] == posOld[3]["x"] && posOld[1]["y"] < posOld[3]["y"] ) {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] - 1);
          posDif[3]["y"] = (posOld[3]["y"] - 1);

        } else {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] + 1);
          posDif[3]["y"] = (posOld[3]["y"] - 1);

        }

        for (var i = 0; i < posDif.length; i++) {
          posNew[i]["x"] = posDif[i]["x"];
          posNew[i]["y"] = posDif[i]["y"];
          if(!this.isMoveValid(posNew[i])) {
            moveValid = false;
            break;
          }
        }

        break;

      case 4:

        posDif[1]["x"] = (posOld[1]["x"]);
        posDif[1]["y"] = (posOld[1]["y"]);

        if( posOld[1]["x"] == posOld[3]["x"] && posOld[1]["y"] > posOld[3]["y"] ) {

          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] + 1);
          posDif[3]["y"] = (posOld[3]["y"] + 1);

        } else if( posOld[1]["y"] == posOld[3]["y"] && posOld[1]["x"] < posOld[3]["x"] ) {

          posDif[0]["x"] = (posOld[0]["x"] + 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] - 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] - 1);
          posDif[3]["y"] = (posOld[3]["y"] + 1);

        } else if( posOld[1]["x"] == posOld[3]["x"] && posOld[1]["y"] < posOld[3]["y"] ) {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] + 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] - 1);

          posDif[3]["x"] = (posOld[3]["x"] - 1);
          posDif[3]["y"] = (posOld[3]["y"] - 1);

        } else {

          posDif[0]["x"] = (posOld[0]["x"] - 1);
          posDif[0]["y"] = (posOld[0]["y"] - 1);

          posDif[2]["x"] = (posOld[2]["x"] + 1);
          posDif[2]["y"] = (posOld[2]["y"] + 1);

          posDif[3]["x"] = (posOld[3]["x"] + 1);
          posDif[3]["y"] = (posOld[3]["y"] - 1);

        }

        for (var i = 0; i < posDif.length; i++) {
          posNew[i]["x"] = posDif[i]["x"];
          posNew[i]["y"] = posDif[i]["y"];
          if(!this.isMoveValid(posNew[i])) {
            moveValid = false;
            break;
          }
        }

        break;

      default:
      console.log("Llega con type = " + this.type);
        for (var i = 0; i < this.pos.length; i++) {
          posDif[i]["x"] = (posOld[i]["x"]);
          posDif[i]["y"] = (posOld[i]["y"]);
        }
        for (var i = 0; i < posDif.length; i++) {
          posNew[i]["x"] = posDif[i]["x"];
          posNew[i]["y"] = posDif[i]["y"];
          if(!this.isMoveValid(posNew[i])) {
            moveValid = false;
            break;
          }
        }

    }

    if (moveValid) {
      for (var i = 0; i < this.pos.length; i++) {
          // console.log(posOld[i]);
          // console.log(posNew[i]);
        // PieceCubePos[i] = posNew[i]["x"] + "-" + posNew[i]["y"];
        this.remplaceCube(posOld, posNew);
        this.savePos(posNew);
      }
    } else {
      console.log("No se puede realizar el movimiento");
    }

    return true;
  }

  remplaceCube(posOld, posNew) {

    for (var i = 0; i < this.cube.length; i++) {
      // this.pos[i].x = posNew[i]["x"];
      // this.pos[i].y = posNew[i]["y"];
      // this.cube[i] = posNew[i]["x"] + "-" + posNew[i]["y"];

      if( !this.isCubeInArrayCubes(posOld[i], posNew) ) {
        var cubeOld = document.getElementById("cube-" + posOld[i]["x"] + "-" + posOld[i]["y"]);
        cubeOld.setAttribute('class', this.cubeClassInit);
      }
      if( !this.isCubeInArrayCubes(posNew[i], posOld) ) {
// console.log(posOld);
// console.log(posNew);
        var cubeNew = document.getElementById("cube-" + posNew[i]["x"] + "-" + posNew[i]["y"]);
        cubeNew.setAttribute('class', this.cubeClassInit + " bg-" + this.color);
      }
    }

  }

  isCubeInArrayCubes(cube, cubes) {
    for (var i = 0; i < cubes.length; i++) {
      if (cube.x == cubes[i].x && cube.y == cubes[i].y) {
        return true;
      }
    }
    return false;
  }

  savePos(posValue) {
    console.log(posValue);
    for (var i = 0; i < posValue.length; i++) {
      this.pos[i].x = posValue[i]["x"];
      this.pos[i].y = posValue[i]["y"];
    }
  }

  isCompleteLine(posAct) {

    var yCoord = [];
    var cube = [];

    for (var i = 0; i < posAct.length; i++) {
      if( yCoord.indexOf(posAct[i].y) < 0 ) {
        yCoord.push(posAct[i].y);
      }
    }

    for (var i = 0; i < 10; i++) {
      cube[i] = document.getElementById("cube-" + i + "-" + yCoord[i]);
      if ( !this.hasClass(cube[i], "cube-stop") ) {
        return false;
      }
    }

    for (var i = 0; i < cube.length; i++) {
      cube[i].setAttribute('class', this.cubeClassInit);
    }

    return true

  }

}
