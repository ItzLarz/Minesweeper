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
  for (i = 0; i < columns; i++)
  {
    for (j = 0; j < rows; j++)
    {
      if(square.covered == false) 
      {
        switch (square.value)
        {
          case 0:
            image(square0, square.rawx, square.rawy);
              uncoverSurrounding(i, j, square);
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
  }
}

function uncoverSurrounding(i, j, square)
{
  if (squares[i][j].value == 0 && squares[i][j].covered == false)
  {
    // Upper left corner
    if (i === 0 && j === 0)
    {
      squares[0][1].covered = false;
      squares[1][0].covered = false;
      squares[1][1].covered = false;
    }
    
    // Upper right corner
    else if (i === columns - 1 && j === 0)
    {
      squares[columns-2][0].covered = false;
      squares[columns-1][1].covered = false;
      squares[columns-2][1].covered = false;
    }

    // Bottom left corner
    else if (i === 0 && j === rows - 1)
    {
      squares[0][rows-2].covered = false;
      squares[1][rows-1].covered = false;
      squares[1][rows-2].covered = false;
    }

    // Bottom right corner
    else if (i === columns - 1 && j === rows - 1)
    {
      squares[columns-1][rows-2].covered = false;
      squares[columns-2][rows-1].covered = false;
      squares[columns-2][rows-2].covered = false;
    }

    // Left wall
    else if (i === 0 && j != 0)
    {
      squares[i][j-1].covered = false;
      squares[i+1][j-1].covered = false;
      squares[i+1][j].covered = false;
      squares[i+1][j+1].covered = false;
      squares[i][j+1].covered = false;
    }
    
    // Right wall
    else if (i === columns - 1 && j != 0)
    {
      squares[i][j-1].covered = false;
      squares[i-1][j-1].covered = false;
      squares[i-1][j].covered = false;
      squares[i-1][j+1].covered = false;
      squares[i][j+1].covered = false;
    }

    // Upper wall
    else if (i != 0 && j === 0)
    {
      squares[i-1][j].covered = false;
      squares[i-1][j+1].covered = false;
      squares[i][j+1].covered = false;
      squares[i+1][j+1].covered = false;
      squares[i+1][j].covered = false;
    }

    // Bottom wall
    else if (i != 0 && j === rows - 1)
    {
      squares[i-1][j].covered = false;
      squares[i-1][j-1].covered = false;
      squares[i][j-1].covered = false;
      squares[i+1][j-1].covered = false;
      squares[i+1][j].covered = false;
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
    }
    uncover(square);
  }
}
