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

function mouseReleased()
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
    
    let col = Math.floor((x - edgeSize) / boxSize);
    let row = Math.floor((y - edgeSize) / boxSize);
    let square = findSquare(col, row);
    
    if (button === "left" && square.covered === true && square.marked === false)
    {
      square.covered = false;

      if (square.bomb === true)
      {
        // gameOver = true;
        image(squareRedMine, square.rawx, square.rawy);
      }

      else if (square.bomb === false)
      {
        switch (square.value) // make function uncover
        {
          case 0:
            image(square0, square.rawx, square.rawy);

            let c = 1
            while(c != 0)
            {
              c = 0
              for (i = 0; i < columns; i++)
              {
                for (j = 0; j < rows; j++)
                {
                  if (squares[i][j].value == 0 && squares[i][j].covered == false)
                  {
                    // Upper left corner
                    if (i === 0 && j === 0)
                    {
                      squares[0][1].covered = false;
                      squares[1][0].covered = false;
                      squares[1][1].covered = false;
                      image(square0, squares[0][1].rawx, squares[0][1].rawy);
                      image(square0, squares[1][0].rawx, squares[1][0].rawy);
                      image(square0, squares[1][1].rawx, squares[1][1].rawy);
                    }
                    
                    // Upper right corner
                    else if (i === columns - 1 && j === 0)
                    {
                      squares[columns-2][0].covered = false;
                      squares[columns-1][1].covered = false;
                      squares[columns-2][1].covered = false;
                      image(square0, squares[columns-2][0].rawx, squares[columns-2][0].rawy);
                      image(square0, squares[columns-1][1].rawx, squares[columns-1][1].rawy);
                      image(square0, squares[columns-2][1].rawx, squares[columns-2][1].rawy);
                    }

                    // Bottom left corner
                    else if (i === 0 && j === rows - 1)
                    {
                      squares[0][rows-2].covered = false;
                      squares[1][rows-1].covered = false;
                      squares[1][rows-2].covered = false;
                      image(square0, squares[0][rows-2].rawx, squares[0][rows-2].rawy);
                      image(square0, squares[1][rows-1].rawx, squares[1][rows-1].rawy);
                      image(square0, squares[1][rows-2].rawx, squares[1][rows-2].rawy);
                    }

                    // Bottom right corner
                    else if (i === columns - 1 && j === rows - 1)
                    {
                      squares[columns-1][rows-2].covered = false;
                      squares[columns-2][rows-1].covered = false;
                      squares[columns-2][rows-2].covered = false;
                      image(square0, squares[columns-1][rows-2].rawx, squares[columns-1][rows-2].rawy);
                      image(square0, squares[columns-2][rows-1].rawx, squares[columns-2][rows-1].rawy);
                      image(square0, squares[columns-2][rows-2].rawx, squares[columns-2][rows-2].rawy);
                    }

                    // Left wall
                    else if (i === 0 && j != 0)
                    {
                      squares[i][j-1].covered = false;
                      squares[i+1][j-1].covered = false;
                      squares[i+1][j].covered = false;
                      squares[i+1][j+1].covered = false;
                      squares[i][j+1].covered = false;
                      image(square0, squares[i][j-1].rawx,   squares[i][j-1].rawy);
                      image(square0, squares[i+1][j-1].rawx, squares[i+1][j-1].rawy);
                      image(square0, squares[i+1][j].rawx,   squares[i+1][j].rawy);
                      image(square0, squares[i+1][j+1].rawx, squares[i+1][j+1].rawy);
                      image(square0, squares[i][j+1].rawx,   squares[i][j+1].rawy);
                    }
                    
                    // Right wall
                    else if (i === columns - 1 && j != 0)
                    {
                      squares[i][j-1].covered = false;
                      squares[i-1][j-1].covered = false;
                      squares[i-1][j].covered = false;
                      squares[i-1][j+1].covered = false;
                      squares[i][j+1].covered = false;
                      image(square0, squares[i][j-1].rawx,   squares[i][j-1].rawy);
                      image(square0, squares[i-1][j-1].rawx, squares[i-1][j-1].rawy);
                      image(square0, squares[i-1][j].rawx,   squares[i-1][j].rawy);
                      image(square0, squares[i-1][j+1].rawx, squares[i-1][j+1].rawy);
                      image(square0, squares[i][j+1].rawx,   squares[i][j+1].rawy);
                    }

                    // Upper wall
                    else if (i != 0 && j === 0)
                    {
                      if (squares[i-1][j].bomb === true){countBombs++;}
                      if (squares[i-1][j+1].bomb === true){countBombs++;}
                      if (squares[i][j+1].bomb === true){countBombs++;}
                      if (squares[i+1][j+1].bomb === true){countBombs++;}
                      if (squares[i+1][j].bomb === true){countBombs++;}

                      squares[i-1][j].covered = false;
                      squares[i-1][j+1].covered = false;
                      squares[i][j+1].covered = false;
                      squares[i+1][j+1].covered = false;
                      squares[i+1][j].covered = false;
                      image(square0, squares[i-1][j].rawx,   squares[i-1][j].rawy);
                      image(square0, squares[i-1][j+1].rawx, squares[i-1][j+1].rawy);
                      image(square0, squares[i][j+1].rawx,   squares[i][j+1].rawy);
                      image(square0, squares[i+1][j+1].rawx, squares[i+1][j+1].rawy);
                      image(square0, squares[i+1][j].rawx,   squares[i+1][j].rawy);
                    }

                    // Bottom wall
                    else if (i != 0 && j === rows - 1)
                    {
                      squares[i-1][j].covered = false;
                      squares[i-1][j-1].covered = false;
                      squares[i][j-1].covered = false;
                      squares[i+1][j-1].covered = false;
                      squares[i+1][j].covered = false;
                      image(square0, square[i-1][j].rawx,   squares[i-1][j].rawy);
                      image(square0, square[i-1][j-1].rawx, squares[i-1][j-1].rawy);
                      image(square0, square[i][j-1].rawx,   squares[i][j-1].rawy);
                      image(square0, square[i+1][j-1].rawx, squares[i+1][j-1].rawy);
                      image(square0, square[i+1][j].rawx,   squares[i+1][j].rawy);
                    }

                    // Rest of the squares
                    else if (i < columns && j < rows)
                    {
                      squares[i-1][j].covered = false;
                      squares[i-1][j-1].covered = false;
                      squares[i][j-1].covered = false;
                      squares[i+1][j-1].covered = false;
                      squares[i+1][j].covered = false;
                      squares[i+1][j+1].covered = false;
                      squares[i][j+1].b.covered = false;
                      squares[i-1][j+1].covered = false;
                      image(square0, square[i-1][j].rawx,   squares[i-1][j].rawy);
                      image(square0, square[i-1][j-1].rawx, squares[i-1][j-1].rawy);
                      image(square0, square[i][j-1].rawx,   squares[i][j-1].rawy);
                      image(square0, square[i+1][j-1].rawx, squares[i+1][j-1].rawy);
                      image(square0, square[i+1][j].rawx,   squares[i+1][j].rawy);
                      image(square0, square[i+1][j+1].rawx, squares[i+1][j+1].rawy);
                      image(square0, square[i][j+1].rawx,   squares[i][j+1].rawy);
                      image(square0, square[i-1][j+1].rawx, squares[i-1][j+1].rawy);
                    }
                  }
                }
              }
            }
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
        image(squareFlag, square.rawx, square.rawy);
      }

      else if (square.marked === true)
      {
        square.marked = false;
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
