document.addEventListener("DOMContentLoaded", function(event) {
    // console.log( "ready!" );
    // console.log( pieceGenerator() );
    // init();
    // keyArrowsPress();
    var tablero = new Board(10,20);
    console.log(tablero.board);

    newPiece();

    // if( pieza.move({"x": 0, "y": -1}) ) {
    //   pieza = new Piece(pieza.type, pieza.pos);
    //   if( pieza.move({"x": 0, "y": -1}) ) {
    //     // pieza = new Piece(pieza.type, pieza.pos);
    //   }
    // }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newPiece() {
  // var pieza = new Piece(getRandomInt(0, 2));
    var pieza = new Piece(0);
  // var piezaPos = pieza.pos;
  // console.log(piezaPos);
  // console.log(pieza.type);
  var intervalTimes = 0;
  var MovePieceInterval =  setInterval(function(){
    if( pieza.move({"x": 0, "y": -1}) ) {
      // console.log();

      pieza = reloadPiece(pieza);
      intervalTimes++;
    } else {
      pieza = null;
      intervalTimes = 0;
      clearInterval(MovePieceInterval);
      newPiece();
    }

      if ( intervalTimes == 1) {
        console.log("intervalTimes = 1");
        console.log(pieza.pos);
        keyArrowsPress(pieza);
      }
  }, 1000);
}

function reloadPiece(pieza) {

  return new Piece(pieza.type, pieza.pos)
}

/*
* Variables globales
*/
var XTotal = 9; // 10 unidades
var YTotal = 19; // 10 unidades
var Tablero = [];
var CubeClassInit = "tetris-cube";
var PieceCubePos = [];
var PieceType;
var PieceColor;
// var MovePieceInterval;

function init() {
  Tablero = createBoard(10, 20);
  console.log(Tablero);
  putPieceInBoard();
}

/*
Crear Tablero
 */
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

/*
Teclas de posición
 */
function keyArrowsPress(pieza) {
  document.addEventListener("keydown", function(event) {
    var key = event.which;
    switch(key) {
      case 37:
          // Key left.
          console.log("izquierda!!!");
          console.log(pieza.pos);
          pieza.move({"x": -1, "y": 0});
          // reloadPiece(pieza);
          // movePiece([-1,0], PieceCubePos);
          break;
      case 38:
          // Key up.
          // turnPiece(PieceType, PieceCubePos);
          console.log("arriba!!!");
          pieza.turnPiece();
          break;
      case 39:
          // Key right.
          console.log("derecha!!!");
          pieza.move({"x": 1, "y": 0});
          // reloadPiece(pieza);
          // movePiece([1,0], PieceCubePos);
          break;
      case 40:
          // Key down.
          pieza.move({"x": 0, "y": -1});
          // reloadPiece(pieza);
          // movePiece([0,-1], PieceCubePos);
          break;
    }
  });
}

/*
Funciones automaticas
 */
function movePieceAutomatic() {
  MovePieceInterval =  setInterval(function(){
    movePiece([0,-1], PieceCubePos);
  }, 1000);
}

function putPieceInBoard() {

  var newPiece = pieceGenerator();

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

function isStopPiece(posNewArray) {
  /*
  Solo si el movimiento es valido
   */
  if( !isMoveValid(posNewArray) && isCubeInBoard(posNewArray)){
    var cube = document.getElementById("cube-" + posNewArray["x"] + "-" + posNewArray["y"]);
    if (hasClass(cube, "cube-stop")) {
      return true;
    }
    return false;
  }
  return false;

}

function isCubeInBoard(posNewArray) {
  if (posNewArray["x"] > -1 && posNewArray["x"] <= XTotal
  && posNewArray["y"] > -1 && posNewArray["y"] <= YTotal) {
    return true;
  }
  return false
}

function isMoveValid(posNewArray) {

  retValue = false;

  if ( isCubeInBoard(posNewArray) ) {
    var cube = document.getElementById("cube-" + posNewArray["x"] + "-" + posNewArray["y"]);
    if(!hasClass(cube, "cube-stop") ) {
      retValue = true;
    }
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

    if(posNewArray[i]["y"] < 0 || isStopPiece(posNewArray[i])) {
      noMoreMoveY = true;
      moveValid = false;
      break;
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
      remplaceCube(posOldArray[i], posNewArray[i], PieceColor);
    }
  } else {
    console.log("entra");
      console.log(yMove);
        console.log(noMoreMoveY);
    if(noMoreMoveY) {
      console.log("entra2222");
      stopPiece(PieceCubePos);
      clearInterval(MovePieceInterval);
      console.log("No se puede realizar el movimiento");
      putPieceInBoard();
    }
  }

}

function stopPiece(pieceCubePos) {
  for (var i = 0; i < pieceCubePos.length; i++) {
    var splitPos = pieceCubePos[i].split("-");
    var cube = document.getElementById("cube-" + splitPos[0] + "-" + splitPos[1]);
    // console.log(pieceCubePos[i]);
    // console.log(cube.getAttribute("class"));
    cube.setAttribute('class', cube.getAttribute("class") + " cube-stop");
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
        // remplaceCube(posOldArray[i], posNewArray[i], PieceColor);
      }

      break;

    default:
    console.log("Llega con type = " + type);
      for (var i = 0; i < PieceCubePos.length; i++) {
        posDif[i]["x"] = (posOldArray[i]["x"]);
        posDif[i]["y"] = (posOldArray[i]["y"]);
      }
      for (var i = 0; i < posDif.length; i++) {
        posNewArray[i]["x"] = posDif[i]["x"];
        posNewArray[i]["y"] = posDif[i]["y"];
        if(!isMoveValid(posNewArray[i])) {
          moveValid = false;
          break;
        }
      }

  }

  if (moveValid) {
    for (var i = 0; i < pieceCubePos.length; i++) {
      PieceCubePos[i] = posNewArray[i]["x"] + "-" + posNewArray[i]["y"];
      remplaceCube(posOldArray[i], posNewArray[i], PieceColor);
    }
  } else {
    console.log("No se puede realizar el movimiento");
  }

  // return PieceCubePos;

}

function pieceGenerator() {

  var type = Math.round( (Math.random() * 1) + 1);
  PieceType = type;
  var retVal = {};

  switch (type) {
    case 0:

      retVal.color = "blue";
      retVal.xUnits = 4;
      retVal.yUnits = 1;

      PieceCubePos[0] = "3-19";
      PieceCubePos[1] = "4-19";
      PieceCubePos[2] = "5-19";
      PieceCubePos[3] = "6-19";

      break;

    case 1:

      retVal.color = "yellow";
      retVal.xUnits = 2;
      retVal.yUnits = 2;

      PieceCubePos[0] = "4-18";
      PieceCubePos[1] = "4-19";
      PieceCubePos[2] = "5-18";
      PieceCubePos[3] = "5-19";

      break;

    default:
      break;
  }

  PieceType = type;
  PieceColor = retVal.color;

  return retVal;

}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
