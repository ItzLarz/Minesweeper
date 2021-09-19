const bombs = 30;
const boxSize = 20;
const edgeSize = 10;
const columns = 15;
const rows = 10;
const stroke = 3;

var squares = [];
var bombList = [];
var gameOver = false;

function setup() 
{
  createCanvas(2 * edgeSize + (boxSize * columns), 2 * edgeSize + (boxSize * rows));
  background(220);
  drawField();
  selectBombs();
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
      strokeWeight(stroke);
      square(edgeSize + (i * boxSize), edgeSize + (j * boxSize), boxSize);
      let object = new Object();
      object.col = i;
      object.row = j;
      object.rawx = edgeSize + (i * boxSize);
      object.rawy = edgeSize + (j * boxSize);
      object.bomb = false;
      object.covered = true;
      object.marked = false;
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
    }
  }
}

function mouseClicked()
{
  if (!gameOver)
  {
    let x = mouseX;
    let y = mouseY;
    let button;
    if (mouseButton === LEFT)
    {
      button = "left";
    }

    else if (mouseButton === RIGHT)
    {
      button = "right";
    }

    let col = Math.floor((x - edgeSize) / (boxSize+edgeSize));
    let row = Math.floor((y - edgeSize) / (boxSize+edgeSize));
    let square = findSquare(col, row);
    
    if (button === "left" && square.covered === true && square.marked === false)
    {
      square.covered = false;
      console.log("uncovered square");

      if (square.bomb === true)
      {
        gameOver = true;
      }
    }

    else if (button === "right" && square.covered === true)
    {
      if (square.marked === false)
      {
        square.marked = true;
        console.log("marked square");
      }

      else if (square.marked === true)
      {
        square.marked = false;
        console.log("unmarked square");
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
