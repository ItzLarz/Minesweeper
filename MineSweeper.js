var bombs = 20;
var squares = [];
function setup() 
{
  createCanvas(380, 255);
  background(220);
  drawField();
  selectBombs();
}

function draw() { }

function drawField() 
{
  for (i = 5; i <= 370; i += 25) {
    for (j = 5; j <= 245; j += 25) {
      square(i, j, 20);
      append(squares, "x" + i + "y" + j);
    }
  }
}

function selectBombs() 
{
  var bombList = [];

  while (bombList.length < bombs) 
  {
    var pickedSquare = random(squares);
    if (!bombList.includes(pickedSquare)) 
    {
      bombList.push(pickedSquare);
      // var tempArray = [];
      // append(tempArray, pickedSquare);
      // append(tempArray, "b");
      // pickedSquare = join(tempArray, "")
      
    }

    else 
    {
      console.log("Bomb not made");
    }
  }
  console.log(bombList);
}