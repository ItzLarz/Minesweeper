const bombs = 20;
const boxSize = 20;
const edgeSize = 10;
const columns = 15;
const rows = 10;
const stroke = 3;

var squares = [];
var bombList = [];

function setup() 
{
  createCanvas(2 * edgeSize + (boxSize * columns), 2 * edgeSize + (boxSize * rows));
  background(220);
  drawField();
  selectBombs();
}

function draw() 
{ 
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
  var x = mouseX;
  var y = mouseY;
  var button;
  if (mouseButton === LEFT)
  {
    button = "left";
  }

  else if (mouseButton === RIGHT)
  {
    button = "right";
  }

  var col = Math.floor((x - edgeSize) / (boxSize+edgeSize))
  var row = Math.floor((y - edgeSize) / (boxSize+edgeSize))
  
  if (button === "left" && findSquare(col, row).bomb == true)
  {
    console.log("Game Over");
  }

}

function findSquare(col, row)
{
  for (i = 0; i < columns; i++)
  {
    for (j = 0; j < rows; j++)
    {
      if (squares[i][j].col == col && squares[i][j].row == row)
      {
        return squares[i][j];
      }
    }
  }
}
