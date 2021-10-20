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
      whiteSquare(square);
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

function whiteSquare(square)
{
  uncoverList = [];
  uncoverList.push(square);
  let length = 1;
  let newLength = 0;
  while(newLength != length)
  {
    length = uncoverList.length;
    for (i = 0; i < length; i++)
    {
      uncoverSurrounding(uncoverList[i]);
    }
    uncoverList = [...new Set(uncoverList)];
    newLength = uncoverList.length;
  }
  
  for(i = 0; i < uncoverList.length; i++)
  {
    uncoverList[i].covered = false;
     
    switch (uncoverList[i].value)
    {
      case 0:
        image(square0, uncoverList[i].rawx, uncoverList[i].rawy);
        break;
      
      case 1:
        image(square1, uncoverList[i].rawx, uncoverList[i].rawy);
        break;
        
      case 2:
        image(square2, uncoverList[i].rawx, uncoverList[i].rawy);
        break;

      case 3:
        image(square3, uncoverList[i].rawx, uncoverList[i].rawy);
        break;

      case 4:
        image(square4, uncoverList[i].rawx, uncoverList[i].rawy);
        break;

      case 5:
        image(square5, uncoverList[i].rawx, uncoverList[i].rawy);
        break;
      
      case 6:
        image(square6, uncoverList[i].rawx, uncoverList[i].rawy);
        break;
        
      case 7:
        image(square7, uncoverList[i].rawx, uncoverList[i].rawy);
        break;

      case 8:
        image(square8, uncoverList[i].rawx, uncoverList[i].rawy);
        break;
    }
  }
}

function uncoverSurrounding(square)
{
  if (square.value == 0)
  {
    // Upper left corner
    if (square.col === 0 && square.row === 0)
    {
      uncoverList.push(squares[0][1]);
      uncoverList.push(squares[1][0]);
      uncoverList.push(squares[1][1]);
      
    }
    
    // Upper right corner
    else if (square.col === columns - 1 && square.row === 0)
    {
      uncoverList.push(squares[columns-2][0]);
      uncoverList.push(squares[columns-1][1]);
      uncoverList.push(squares[columns-2][1]);
    }

    // Bottom left corner
    else if (square.col === 0 && square.row === rows - 1)
    {
      uncoverList.push(squares[0][rows-2]);
      uncoverList.push(squares[1][rows-1]);
      uncoverList.push(squares[1][rows-2]);
    }

    // Bottom right corner
    else if (square.col === columns - 1 && square.row === rows - 1)
    {
      uncoverList.push(squares[columns-1][rows-2]);
      uncoverList.push(squares[columns-2][rows-1]);
      uncoverList.push(squares[columns-2][rows-2]);
    }

    // Left wall
    else if (square.col === 0 && square.row != 0)
    {
      uncoverList.push(squares[square.col][square.row-1]);
      uncoverList.push(squares[square.col+1][square.row-1]);
      uncoverList.push(squares[square.col+1][square.row]);
      uncoverList.push(squares[square.col+1][square.row+1]);
      uncoverList.push(squares[square.col][square.row+1]);
    }
    
    // Right wall
    else if (square.col === columns - 1 && square.row != 0)
    {
      uncoverList.push(squares[square.col][square.row-1]);
      uncoverList.push(squares[square.col-1][square.row-1]);
      uncoverList.push(squares[square.col-1][square.row]);
      uncoverList.push(squares[square.col-1][square.row+1]);
      uncoverList.push(squares[square.col][square.row+1]);
    }

    // Upper wall
    else if (square.col != 0 && square.row === 0)
    {
      uncoverList.push(squares[square.col-1][square.row]);
      uncoverList.push(squares[square.col-1][square.row+1]);
      uncoverList.push(squares[square.col][square.row+1]);
      uncoverList.push(squares[square.col+1][square.row+1]);
      uncoverList.push(squares[square.col+1][square.row]);
    }

    // Bottom wall
    else if (square.col != 0 && square.row === rows - 1)
    {
      uncoverList.push(squares[square.col-1][square.row]);
      uncoverList.push(squares[square.col-1][square.row-1]);
      uncoverList.push(squares[square.col][square.row-1]);
      uncoverList.push(squares[square.col+1][square.row-1]);
      uncoverList.push(squares[square.col+1][square.row]);
    }

    // Rest of the squares
    else if (square.col < columns && square.row < rows)
    {
      uncoverList.push(squares[square.col-1][square.row]);
      uncoverList.push(squares[square.col-1][square.row-1]);
      uncoverList.push(squares[square.col][square.row-1]);
      uncoverList.push(squares[square.col+1][square.row-1]);

      uncoverList.push(squares[square.col+1][square.row]);
      uncoverList.push(squares[square.col+1][square.row+1]);
      uncoverList.push(squares[square.col][square.row+1]);
      uncoverList.push(squares[square.col-1][square.row+1]);
    }
  }
}