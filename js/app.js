document.addEventListener("DOMContentLoaded", function(event) {
    console.log( "ready!" );
    console.log( pieceGenerator() );
    init();
    keyArrowsPress();
});

var XTotal = 9; // 10 unidades
var YTotal = 19; // 10 unidades
var Tablero = [];
var CubeClassInit = "tetris-cube";
var PieceCubePos = [];
var PieceType;
var PieceColor;
var MovePieceInterval;

function createBoard(width, height){
    var result = [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
          result[i][j] = 0;
          // result[i][j] = (Math.random() * 5 | 0) + 6;
        }
    }
    return result;
}

function init() {
  Tablero = createBoard(10, 20);
  console.log(Tablero);
  putPieceInBoard();
}

function keyArrowsPress() {
  document.addEventListener("keydown", function(event) {
    var key = event.which;
    switch(key) {
      case 37:
          // Key left.
          console.log("izquierda!!!");
          movePiece([-1,0], PieceCubePos);
          break;
      case 38:
          // Key up.
          turnPiece(PieceType, PieceCubePos);
          break;
      case 39:
          // Key right.
          console.log("derecha!!!");
          movePiece([1,0], PieceCubePos);
          break;
      case 40:
          // Key down.
          movePiece([0,-1], PieceCubePos);
          break;
    }
  });
}

function movePieceAutomatic() {
  MovePieceInterval =  setInterval(function(){
    movePiece([0,-1], PieceCubePos);
  }, 1000);
}

function putPieceInBoard() {

  var newPiece = pieceGenerator();

  PieceCubePos[0] = "3-10";
  PieceCubePos[1] = "4-10";
  PieceCubePos[2] = "5-10";
  PieceCubePos[3] = "6-10";

  var cube0 = document.getElementById("cube-" + PieceCubePos[0]);
  var cube1 = document.getElementById("cube-" + PieceCubePos[1]);
  var cube2 = document.getElementById("cube-" + PieceCubePos[2]);
  var cube3 = document.getElementById("cube-" + PieceCubePos[3]);

  var cubeClass = CubeClassInit + " bg-" + newPiece.color;
  cube0.setAttribute('class', cubeClass)
  cube1.setAttribute('class', cubeClass)
  cube2.setAttribute('class', cubeClass)
  cube3.setAttribute('class', cubeClass)

  console.log(cube1);

  // turnPiece(0, PieceCubePos);
  // movePiece([-4,0], PieceCubePos);
  movePieceAutomatic();

}

function isMoveValid(posNewArray) {

  retValue = false;

  if (posNewArray["x"] > -1 && posNewArray["x"] <= XTotal
  && posNewArray["y"] > -1 && posNewArray["y"] <= YTotal) {
    retValue = true;
  }

  return retValue;

}

function remplaceCube(posOldArray, posNewArray, color) {

  var cubeOld = document.getElementById("cube-" + posOldArray["x"] + "-" + posOldArray["y"]);
  var cubeNew = document.getElementById("cube-" + posNewArray["x"] + "-" + posNewArray["y"]);

  cubeOld.setAttribute('class', CubeClassInit);
  cubeNew.setAttribute('class', CubeClassInit + " bg-" + color);
}

function movePiece(moveArray, pieceCubePos) {

  var xMove = parseInt( moveArray[0] );
  var yMove = parseInt( moveArray[1] );
  var moveValid = true;
  console.log(yMove);
  var posNewArray = [];
  var posOldArray = [];
  var reverseFor = false;
  var noMoreMoveY = false;

  if(yMove > 0) {
    reverseFor = true;
  }

  // recorremos en funcion del movimiento
  for (var k = 0; k < pieceCubePos.length; k++) {
    if(!reverseFor) {
      var i = k;
    } else {
      var i = (pieceCubePos.length - 1) - k;
    }

    var splitPos = pieceCubePos[i].split("-");
    posOldArray[i] = [];
    posOldArray[i]["x"] = parseInt(splitPos[0]);
    posOldArray[i]["y"] = parseInt(splitPos[1]);
    // var xPos = parseInt(splitPos[0]);
    // var yPos = parseInt(splitPos[1]);
    posNewArray[i] = [];
    posNewArray[i]["x"] = posOldArray[i]["x"] + xMove;
    posNewArray[i]["y"] = posOldArray[i]["y"] + yMove;

    if(posNewArray[i]["y"] == 0) {
      noMoreMoveY = true;
    }
console.log(posOldArray[i]);
console.log(posNewArray[i]);



    if(!isMoveValid(posNewArray[i])) {
      moveValid = false;
      break;
    }

  }

  if (moveValid) {
    for (var i = 0; i < pieceCubePos.length; i++) {
      PieceCubePos[i] = posNewArray[i]["x"] + "-" + posNewArray[i]["y"];
      remplaceCube(posOldArray[i], posNewArray[i], "blue");
    }
  } else {
    console.log("entra");
      console.log(yMove);
        console.log(noMoreMoveY);
    if(yMove == 0 && noMoreMoveY) {
      console.log("entra2222");
      clearInterval(MovePieceInterval);
    } else {

    }
    console.log("No se puede realizar el movimiento");
  }

}

function turnPiece(type, pieceCubePos) {
// console.log(pieceCubePos);
  var posOldArray = [];
  var posNewArray = [];
  var moveValid = true;
  var posAct;
  var posDif = [];
  for (var i = 0; i < PieceCubePos.length; i++) {
    var splitPos = pieceCubePos[i].split("-");
    posOldArray[i] = [];
    posNewArray[i] = [];
    posOldArray[i]["x"] = parseInt(splitPos[0]);
    posOldArray[i]["y"] = parseInt(splitPos[1]);
    posDif[i] = [];
  }

  switch (type) {
    case 0:

      posDif[1]["x"] = (posOldArray[1]["x"]);
      posDif[1]["y"] = (posOldArray[1]["y"]);

      if( posOldArray[1]["x"] == posOldArray[0]["x"]
      && posOldArray[2]["x"] == posOldArray[0]["x"]
      && posOldArray[3]["x"] == posOldArray[0]["x"]) {

        posDif[0]["x"] = (posOldArray[0]["x"] - 1);
        posDif[0]["y"] = (posOldArray[0]["y"] + 1);

        posDif[2]["x"] = (posOldArray[2]["x"] + 1);
        posDif[2]["y"] = (posOldArray[2]["y"] - 1);

        posDif[3]["x"] = (posOldArray[3]["x"] + 2);
        posDif[3]["y"] = (posOldArray[3]["y"] - 2);

      } else {

        posDif[0]["x"] = (posOldArray[0]["x"] + 1);
        posDif[0]["y"] = (posOldArray[0]["y"] - 1);

        posDif[2]["x"] = (posOldArray[2]["x"] - 1);
        posDif[2]["y"] = (posOldArray[2]["y"] + 1);

        posDif[3]["x"] = (posOldArray[3]["x"] - 2);
        posDif[3]["y"] = (posOldArray[3]["y"] + 2);

      }

      for (var i = 0; i < posDif.length; i++) {
        posNewArray[i]["x"] = posDif[i]["x"];
        posNewArray[i]["y"] = posDif[i]["y"];
        if(!isMoveValid(posNewArray[i])) {
          moveValid = false;
          break;
        }
        // remplaceCube(posOldArray[i], posNewArray[i], "blue");
      }

      break;
    default:

  }

  if (moveValid) {
    for (var i = 0; i < pieceCubePos.length; i++) {
      PieceCubePos[i] = posNewArray[i]["x"] + "-" + posNewArray[i]["y"];
      remplaceCube(posOldArray[i], posNewArray[i], "blue");
    }
  } else {
    console.log("No se puede realizar el movimiento");
  }

  // return PieceCubePos;

}

function pieceGenerator() {

  var type = 0;
  PieceType = type;
  var retVal = {};

  switch (type) {
    case 0:

      retVal.color = "blue";
      retVal.xUnits = 4;
      retVal.yUnits = 1;
      break;

    default:
      break;
  }

  return retVal;

}
