var NUM_ROWS = 20;
var NUM_COLS = 10;
var INTERVAL_TIME = 1000;

// var KEY_ENTER = 13;
// var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_UP = 38;
var KEY_DOWN = 40;
// var KEY_A = 65;
// var KEY_D = 68;
// var KEY_R = 82;

document.addEventListener("DOMContentLoaded", function(event) {

    var tablero = new Board(NUM_COLS, NUM_ROWS);

    init();

});



function resetPiece(type, pos) {
  return new Piece( type, pos );
}

function makePiece() {
  return new Piece( getRandomInt(0, 2) );
}

function init() {

  var game = makePiece();

  var intervalHandler = setInterval(
    function () {
      if ( game.moveDown() ) {

      } else {
        game = makePiece();
      }
        // game = resetPiece(game.type, game.pos);
        // game.moveDown();
    },
    INTERVAL_TIME
  );

  function keyHandler(kev) {
      if (kev.shiftKey || kev.altKey || kev.metaKey)
        return;
      var consumed = true;
      var mustpause = false;
      if (kev.keyCode === KEY_LEFT) {
        game.moveLeft();
      } else if (kev.keyCode === KEY_RIGHT) {
        game.moveRight();
      } else if (kev.keyCode === KEY_UP) {
        game.turnPiece();
      } else if (kev.keyCode === KEY_DOWN) {
        game.moveDown();
      } else {
        consumed = false;
      }
      if (consumed) {
        kev.preventDefault();
        if (mustpause) {
          document.removeEventListener('keydown', keyHandler);
          clearInterval(intervalHandler);
          pause();
        } else {
          resetPiece(game.type, game.pos);
          // redraw(game, false, containerElem);
        }
      }
  }

  document.addEventListener('keydown', keyHandler);

}

/*
var pieza = [];
var nPieza = -1;
var posCubes = [];
function newPiece() {
  nPieza++;
  pieza[nPieza] = new Piece(getRandomInt(0, 2));

  var intervalTimes = 0;
  var MovePieceInterval =  setInterval(function(){
    posCubes = pieza[nPieza].pos;
    var tyype = pieza[nPieza].type;
    pieza[nPieza] = new Piece(tyype, posCubes);
    if( pieza[nPieza].move({"x": 0, "y": -1}) ) {


      pieza[nPieza] = reloadPiece(pieza[nPieza]);
      intervalTimes++;
    } else {
      // pieza = null;
      intervalTimes = 0;
      clearInterval(MovePieceInterval);
      newPiece();
    }

  }, 1000);
}

function reloadPiece(pieza) {

  return new Piece(pieza.type, pieza.pos)
}
*/
/*
* Variables globales
*//*
var XTotal = 9; // 10 unidades
var YTotal = 19; // 10 unidades
var Tablero = [];
var CubeClassInit = "tetris-cube";
var PieceCubePos = [];
var PieceType;
var PieceColor;
// var MovePieceInterval;
//

*/
// function init() {
//   Tablero = createBoard(NUM_COLS, NUM_ROWS);
// }

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
/*function keyArrowsPressDisable(pieza) {
  document.removeEventListener("keydown", keyArrowsMove);
}
function keyArrowsPress() {
  document.addEventListener("keydown", function(event) {
    keyArrowsMove(event, pieza);
  });
}

function keyArrowsMove(event) {
  var consumed = true;
  var key = event.which;
  var cubes = [];
  posCubes = [];
  for (var j = 0; j < 20; j++) {
    cubes[j] = [];
    for (var i = 0; i < 10; i++) {
      cubes[j][i] = document.getElementById("cube-" + i + "-" + j);
      // tiene mv-piece
      if(hasClass(cubes[j][i], "mv-piece")) {
        var posAct = {"x" : i, "y" : j}
        posCubes.push(posAct);
      }
    }
  }
  var piecita = new Piece(0,posCubes);
  switch(key) {
    case 37:
        // Key left.
        // console.log(pieza.pos);
        piecita.move({"x": -1, "y": 0});
        // reloadPiece(pieza);
        // movePiece([-1,0], PieceCubePos);
        break;
    case 38:
        // Key up.
        // turnPiece(PieceType, PieceCubePos);
        piecita.turnPiece();
        break;
    case 39:
        // Key right.
        piecita.move({"x": 1, "y": 0});
        // reloadPiece(pieza);
        // movePiece([1,0], PieceCubePos);
        break;
    case 40:
        // Key down.
        piecita.move({"x": 0, "y": -1});
        // reloadPiece(pieza);
        // movePiece([0,-1], PieceCubePos);
        break;

    default:
      consumed = false;
      break;
  }
  if (consumed) {
    event.preventDefault();
  }
}*/


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
