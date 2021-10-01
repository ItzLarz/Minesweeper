const bombs = 10;
const boxSize = 16;
const edgeSize = 10;
const columns = 15;
const rows = 10;

var squares = [];
var bombList = [];
var gameOver = false;

let square0;
let square1;
let square2;
let square3;
let square4;
let square5;
let square6;
let square7;
let square8;
let squareBlank;
let squareFlag;
let squareMine;
let squareNotMine;
let squareRedMine;

function preload() 
{
  square0 = loadImage("img/0.png");
  square1 = loadImage("img/1.png");
  square2 = loadImage("img/2.png");
  square3 = loadImage("img/3.png");
  square4 = loadImage("img/4.png");
  square5 = loadImage("img/5.png");
  square6 = loadImage("img/6.png");
  square7 = loadImage("img/7.png");
  square8 = loadImage("img/8.png");
  squareBlank = loadImage("img/blank.png");
  squareFlag = loadImage("img/flag.png");
  squareMine = loadImage("img/mine.png");
  squareNotMine = loadImage("img/notmine.png");
  squareRedMine = loadImage("img/redmine.png");
}


document.oncontextmenu = function() 
{
  return false;
}


function setup() 
{
  createCanvas(2 * edgeSize + (boxSize * columns), 2 * edgeSize + (boxSize * rows));
  background(0);
  
  drawField();
  selectBombs();
  calcValue();
}

function draw() 
{ 
  if (gameOver)
  {
    background(220);
    textSize(30);
    textAlign(CENTER, CENTER); 
    text("Game Over", 0, 0);
  }
}

function drawField() 
{
  for (i = 0; i < columns; i++) 
  {
    let tempList = [];
    for (j = 0; j < rows; j++) 
    {
      image(squareBlank, edgeSize + (i * boxSize), edgeSize + (j * boxSize), boxSize);
      let object = new Object();
      object.col = i;
      object.row = j;
      object.rawx = edgeSize + (i * boxSize);
      object.rawy = edgeSize + (j * boxSize);
      object.bomb = false;
      object.covered = true;
      object.marked = false;
      object.value = 0;
      tempList.push(object);
    }
    squares.push(tempList);
  }
}

function selectBombs() 
{
  while (bombList.length < bombs) 
  {
    let pickedLine = random(squares);
    let pickedSquare = random(pickedLine);
    if (pickedSquare.bomb != true) 
    {
      bombList.push(pickedSquare);
      pickedSquare.bomb = true;
      pickedSquare.value = null;
    }
  }
}

function calcValue()
{
  for (i = 0; i < columns; i++) 
  {
    for (j = 0; j < rows; j++) 
    {
      let countBombs = 0;
      if (squares[i][j].bomb === true)
      {
        continue;
      }

      // Upper left corner
      if (i === 0 && j === 0)
      {
        if (squares[0][1].bomb === true){countBombs++;}
        if (squares[1][0].bomb === true){countBombs++;}
        if (squares[1][1].bomb === true){countBombs++;}
      }
      
      // Upper right corner
      else if (i === columns - 1 && j === 0)
      {
        if (squares[columns-2][0].bomb === true){countBombs++;}
        if (squares[columns-1][1].bomb === true){countBombs++;}
        if (squares[columns-2][1].bomb === true){countBombs++;}
      }

      // Bottom left corner
      else if (i === 0 && j === rows - 1)
      {
        if (squares[0][rows-2].bomb === true){countBombs++}
        if (squares[1][rows-1].bomb === true){countBombs++}
        if (squares[1][rows-2].bomb === true){countBombs++}
      }

      // Bottom right corner
      else if (i === columns - 1 && j === rows - 1)
      {
        if (squares[columns-1][rows-2].bomb === true){countBombs++}
        if (squares[columns-2][rows-1].bomb === true){countBombs++}
        if (squares[columns-2][rows-2].bomb === true){countBombs++}
      }

      // Left wall
      else if (i === 0 && j != 0)
      {
        if (squares[i][j-1].bomb === true){countBombs++;}
        if (squares[i+1][j-1].bomb === true){countBombs++;}
        if (squares[i+1][j].bomb === true){countBombs++;}
        if (squares[i+1][j+1].bomb === true){countBombs++;}
        if (squares[i][j+1].bomb === true){countBombs++;}
      }
      
      // Right wall
      else if (i === columns - 1 && j != 0)
      {
        if (squares[i][j-1].bomb === true){countBombs++;}
        if (squares[i-1][j-1].bomb === true){countBombs++;}
        if (squares[i-1][j].bomb === true){countBombs++;}
        if (squares[i-1][j+1].bomb === true){countBombs++;}
        if (squares[i][j+1].bomb === true){countBombs++;}
      }

      // Upper wall
      else if (i != 0 && j === 0)
      {
        if (squares[i-1][j].bomb === true){countBombs++;}
        if (squares[i-1][j+1].bomb === true){countBombs++;}
        if (squares[i][j+1].bomb === true){countBombs++;}
        if (squares[i+1][j+1].bomb === true){countBombs++;}
        if (squares[i+1][j].bomb === true){countBombs++;}
      }

      // Bottom wall
      else if (i != 0 && j === rows - 1)
      {
        if (squares[i-1][j].bomb === true){countBombs++;}
        if (squares[i-1][j-1].bomb === true){countBombs++;}
        if (squares[i][j-1].bomb === true){countBombs++;}
        if (squares[i+1][j-1].bomb === true){countBombs++;}
        if (squares[i+1][j].bomb === true){countBombs++;}
      }

      // Rest of the squares
      else if (i < columns && j < rows)
      {
        if (squares[i-1][j].bomb === true){countBombs++;}
        if (squares[i-1][j-1].bomb === true){countBombs++;}
        if (squares[i][j-1].bomb === true){countBombs++;}
        if (squares[i+1][j-1].bomb === true){countBombs++;}

        if (squares[i+1][j].bomb === true){countBombs++;}
        if (squares[i+1][j+1].bomb === true){countBombs++;}
        if (squares[i][j+1].bomb === true){countBombs++;}
        if (squares[i-1][j+1].bomb === true){countBombs++;}
      }
      squares[i][j].value = countBombs;
    }
  }
}