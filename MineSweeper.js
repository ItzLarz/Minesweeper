const bombs = 20;
const boxSize = 20;
const edgeSize = 0;
const columns = 15;
const rows = 10;
const stroke = 3;

var squares = [];
var bombList = [];

function setup() 
{
  createCanvas(edgeSize + (boxSize * columns), edgeSize + (boxSize * rows));
  background(220);
  drawField();
  selectBombs();
}

function draw() 
{ 
}

function drawField() 
{
  for (i = 0; i < 15; i++) 
  {
    let tempList = [];
    for (j = 0; j < 10; j++) 
    {
      strokeWeight(stroke);
      square(edgeSize + (i * (boxSize+edgeSize)), edgeSize + (j * (boxSize+edgeSize)), boxSize);
      let object = new Object();
      object.col = i;
      object.row = j;
      object.rawx = edgeSize + (i * boxSize);
      object.rawy = edgeSize + (j * boxSize);
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
  console.log("col=" + col);
  console.log("row=" + row);
  console.log("\n");

}