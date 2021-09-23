const bombs = 30;
const boxSize = 16;
const edgeSize = 10;
const columns = 15;
const rows = 10;

var squares = [];
var bombList = [];
var gameOver = false;
var button = "";

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
      
    }
  }
}

function mouseReleased()
{
  console.log("click");
  if (!gameOver)
  {
    let x = mouseX;
    let y = mouseY;
    

    

    if (mouseButton == LEFT)
    {
      button = "left";
      console.log("left");
    }

    else if (mouseButton == RIGHT)
    {
      button = "right";
      console.log("right");
    }
    
    
    let col = Math.floor((x - edgeSize) / boxSize);
    let row = Math.floor((y - edgeSize) / boxSize);
    let square = findSquare(col, row);
    
    if (button === "left" && square.covered === true && square.marked === false)
    {
      square.covered = false;
      console.log("uncovered square");
      image(square0, square.rawx, square.rawy);

      if (square.bomb === true)
      {
        gameOver = true;
        image(squareRedMine, square.rawx, square.rawy);
      }

      else if (square.bomb === false)
      {
        switch (square.value)
        {
          case 0:
            image(square0, square.rawx, square.rawy);
            break;
          
          case 1:
            image(square1, square.rawx, square.rawy);
            break;
            
          case 2:
            image(square2, square.rawx, square.rawy);
            break;

          case 3:
            image(square3, square.rawx, square.rawy);
            break;

          case 4:
            image(square4, square.rawx, square.rawy);
            break;

          case 5:
            image(square5, square.rawx, square.rawy);
            break;
          
          case 6:
            image(square6, square.rawx, square.rawy);
            break;
            
          case 7:
            image(square7, square.rawx, square.rawy);
            break;

          case 8:
            image(square8, square.rawx, square.rawy);
            break;
        }
      }
    }

    else if (button === "right" && square.covered === true)
    {
      if (square.marked === false)
      {
        square.marked = true;
        console.log("marked square");
        text("hallo", 0, 0);
        image(squareFlag, square.rawx, square.rawy);
      }

      else if (square.marked === true)
      {
        square.marked = false;
        text("hallo", 0,0);
        console.log("unmarked square");
        image(squareBlank, square.rawx, square.rawy);
      }
    }

  }

  function findSquare(col, row)
  {
    for (i = 0; i < columns; i++)
    {
      for (j = 0; j < rows; j++)
      {
        if (squares[i][j].col === col && squares[i][j].row === row)
        {
          return squares[i][j];
        }
      }
    }
  }
}
