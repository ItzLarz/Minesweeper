const bombs = 20;
var squares = [];
var bombList = [];

function setup() 
{
  createCanvas(380, 255);
  background(220);
  drawField();
  selectBombs();
}

function draw() 
{ 
  mouseClicked();
}

function drawField() 
{
  for (i = 0; i < 15; i++) 
  {
    let tempList = [];
    for (j = 0; j < 10; j++) 
    {
      square(5 + (i * 25), 5 + (j * 25), 20);
      let object = new Object();
      object.col = i;
      object.row = j;
      object.rawx = 5 + (i * 25);
      object.rawy = 5 + (j * 25);
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
  
  
  // for (i = 0; i < bombList.length; i++)
  // { 
  //   console.log(bombList[i].bomb);
  // }
}

function mouseClicked()
{
  var x = mouseX;
  var y = mouseY;
  if (mouseButton === LEFT)
  {
    
  }

  else if (mouseButton === RIGHT)
  {
    
  }
}