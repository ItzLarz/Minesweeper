var bombs = 20;
let squares = [];
function setup() 
{
  createCanvas(375, 250);
  background(220);
  drawField();
  selectBombs();
}

function draw() { }

function drawField() 
{
  for (i = 0; i <= 370; i += 25) {
    for (j = 0; j <= 245; j += 25) {
      square(i, j, 20);
      append(squares, "x" + i + "y" + j);
    }
  }
}

function selectBombs() 
{
  var bombCounter = 0;
  while (bombCounter < bombs) {
    var pickedSquare = random(squares);
    if (pickedSquare.safety != "bomb") {
      pickedSquare.safety = "bomb";
      bombCounter++;
      console.log(pickedSquare);
    }

    else {
      console.log("ghello");
    }

    console.log(bombCounter);
  }
}