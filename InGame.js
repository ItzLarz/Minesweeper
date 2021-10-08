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
        uncover(square);
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


function uncover(square) 
{
  square.covered == false;

  switch (square.value)
  {
    case 0:
      image(square0, square.rawx, square.rawy);
      uncoverSurrounding(square);
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
  


function uncoverSurrounding(square)
{
  // Upper left corner
  if (square.col === 0 && square.row === 0)
  {
    squares[0][1].covered = false;
    squares[1][0].covered = false;
    squares[1][1].covered = false;
  }
  
  // Upper right corner
  else if (square.col === columns - 1 && square.row === 0)
  {
    squares[columns-2][0].covered = false;
    squares[columns-1][1].covered = false;
    squares[columns-2][1].covered = false;
  }

  // Bottom left corner
  else if (square.col === 0 && square.row === rows - 1)
  {
    squares[0][rows-2].covered = false;
    squares[1][rows-1].covered = false;
    squares[1][rows-2].covered = false;
  }

  // Bottom right corner
  else if (square.col === columns - 1 && square.row === rows - 1)
  {
    squares[columns-1][rows-2].covered = false;
    squares[columns-2][rows-1].covered = false;
    squares[columns-2][rows-2].covered = false;
  }

  // Left wall
  else if (square.col === 0 && square.row != 0)
  {
    squares[square.col][square.row-1].covered = false;
    squares[square.col+1][square.row-1].covered = false;
    squares[square.col+1][square.row].covered = false;
    squares[square.col+1][square.row+1].covered = false;
    squares[square.col][square.row+1].covered = false;
  }
  
  // Right wall
  else if (square.col === columns - 1 && square.row != 0)
  {
    squares[square.col][square.row-1].covered = false;
    squares[square.col-1][square.row-1].covered = false;
    squares[square.col-1][square.row].covered = false;
    squares[square.col-1][square.row+1].covered = false;
    squares[square.col][square.row+1].covered = false;
  }

  // Upper wall
  else if (square.col != 0 && square.row === 0)
  {
    squares[square.col-1][square.row].covered = false;
    squares[square.col-1][square.row+1].covered = false;
    squares[square.col][square.row+1].covered = false;
    squares[square.col+1][square.row+1].covered = false;
    squares[square.col+1][square.row].covered = false;
  }

  // Bottom wall
  else if (square.col != 0 && square.row === rows - 1)
  {
    squares[square.col-1][square.row].covered = false;
    squares[square.col-1][square.row-1].covered = false;
    squares[square.col][square.row-1].covered = false;
    squares[square.col+1][square.row-1].covered = false;
    squares[square.col+1][square.row].covered = false;
  }

  // Rest of the squares
  else if (square.col < columns && square.row < rows)
  {
    squares[square.col-1][square.row].covered = false;
    squares[square.col-1][square.row-1].covered = false;
    squares[square.col][square.row-1].covered = false;
    squares[square.col+1][square.row-1].covered = false;

    squares[square.col+1][square.row].covered = false;
    squares[square.col+1][square.row+1].covered = false;
    squares[square.col][square.row+1].covered = false;
    squares[square.col-1][square.row+1].covered = false;
  }
  krijgtNogNaam();
}

function krijgtNogNaam()
{
  let found0 = false;
  let col;
  let row;
  for (i = 0; i < columns; i++) 
  {
    for (j = 0; j < rows; j++) 
    {
      if (squares[i][j].covered == false && squares[i][j].bomb == false)
      {
        switch (squares[i][j].value)
        {
          case 0:
            image(square0, squares[i][j].rawx, squares[i][j].rawy);
            found0 = true;
            col = i;
            row = j;
            break;
          
          case 1:
            image(square1, squares[i][j].rawx, squares[i][j].rawy);
            break;
            
          case 2:
            image(square2, squares[i][j].rawx, squares[i][j].rawy);
            break;

          case 3:
            image(square3, squares[i][j].rawx, squares[i][j].rawy);
            break;

          case 4:
            image(square4, squares[i][j].rawx, squares[i][j].rawy);
            break;

          case 5:
            image(square5, squares[i][j].rawx, squares[i][j].rawy);
            break;
          
          case 6:
            image(square6, squares[i][j].rawx, squares[i][j].rawy);
            break;
            
          case 7:
            image(square7, squares[i][j].rawx, squares[i][j].rawy);
            break;

          case 8:
            image(square8, squares[i][j].rawx, squares[i][j].rawy);
            break;
        }
      }
    }
  }

  // if (found0)
  // {  
  //   found0 = false;
  //   uncoverSurrounding(squares[col][row]);
  // }
} 