function mouseReleased() {
  let x = mouseX;
  let y = mouseY;
  let button;
  
  if (mouseButton == LEFT) {
    button = "left";
  }
  
  else if (mouseButton == RIGHT) {
    button = "right";
  }

  if (!homeScreenState) {
    if (!gameOver) {
      let col = Math.floor((x - edgeSize) / boxSize);
      let row = Math.floor((y - edgeSize - topBorderSize) / boxSize);
      let square;

      for (i = 0; i < columns; i++) {
        for (j = 0; j < rows; j++) {
          if (squares[i][j].col == col && squares[i][j].row == row) {
            square = squares[i][j];
          }
        }
      }

      try {
        if (button == "left" && square.covered == true && square.marked == false) {
          gamePlaying = true;
          square.covered = false;

          if (square.bomb == true) {
            gameOver = true;
            defeat = true;
            image(squareRedMine, square.rawx, square.rawy, boxSize, boxSize);
            for (i = 0; i < columns; i++) {
              for (j = 0; j < rows; j++) {
                if (squares[i][j].bomb == true && squares[i][j].covered == true && squares[i][j].marked == false) {
                  uncover(squares[i][j]);
                }

                else if (squares[i][j].marked == true && squares[i][j].bomb == false) {
                  image(squareNotMine, squares[i][j].rawx, squares[i][j].rawy, boxSize, boxSize);
                }
              }
            }

            gameOverScreen();
          }

          else if (square.bomb == false) {
            uncover(square);
            let gameOverCheck = true;
            for (i = 0; i < columns; i++) {
              for (j = 0; j < rows; j++) {
                if (squares[i][j].covered == true && squares[i][j].bomb == false) {
                  gameOverCheck = false;
                  break;
                }
              }

              if (!gameOverCheck) {
                break;
              }
            }

            if (gameOverCheck) {
              gameOver = true;
              win = true;

              for (i = 0; i < columns; i++) {
                for (j = 0; j < rows; j++) {
                  if (squares[i][j].bomb == true && squares[i][j].covered == true && squares[i][j].marked == false) {
                    squares[i][j].marked = false;
                    squares[i][j].covered = false;
                    image(squareFlag, squares[i][j].rawx, squares[i][j].rawy, boxSize, boxSize);
                    bombCount--
                  }
                }
              }

              textAlign(CENTER);
              textSize(columns);
              strokeWeight(0);
              fill(200);
              rect(edgeSize + (boxSize * columns) / 6, topBorderSize / 1.55, columns * 6, topBorderSize - topBorderSize / 1.4);
              fill(0);
              text(bombCount, edgeSize + (boxSize * columns) / 6, topBorderSize / 1.33);
              textAlign(CORNER);

              gameOverScreen();
            }
          }
        }

        else if (button == "right" && square.covered == true) {
          gamePlaying = true;

          if (square.marked == false) {
            square.marked = true;
            image(squareFlag, square.rawx, square.rawy, boxSize, boxSize);
            bombCount--;
          }

          else if (square.marked == true) {
            square.marked = false;
            image(squareBlank, square.rawx, square.rawy, boxSize, boxSize);
            bombCount++;
          }

          textAlign(CENTER);
          textSize(columns);
          strokeWeight(0);
          fill(200);
          rect(edgeSize + (boxSize * columns) / 6, topBorderSize / 1.55, columns * 6, topBorderSize - topBorderSize / 1.4);
          fill(0);
          text(bombCount, edgeSize + (boxSize * columns) / 6, topBorderSize / 1.33);
          textAlign(CORNER);
        }
      }

      catch (TypeError) { }
    }

    if (button == "left" && x > edgeSize + (boxSize * columns / 2) - (columns * 3.33) && x < edgeSize + (boxSize * columns / 2) + (columns * 3.33) && y > topBorderSize / 20 && y < topBorderSize - (topBorderSize / 20)) {
      init();
    }

    else if (button == "left" && x > 0.33 * (2 * edgeSize + (boxSize * columns)) - 0.5 * buttonSize && x < 0.33 * (2 * edgeSize + (boxSize * columns)) + 0.5 * buttonSize && y > 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows) - 0.5 * buttonSize && y < 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows) + 0.5 * buttonSize) {
      homeScreenState = true;
      homeScreen();
    }

    else if (button == "left" && x > 0.66 * (2 * edgeSize + (boxSize * columns)) - 0.5 * buttonSize && x < 0.66 * (2 * edgeSize + (boxSize * columns)) + 0.5 * buttonSize && y > 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows) - 0.5 * buttonSize && y < 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows) + 0.5 * buttonSize) {
      fill(100);
      imageMode(CENTER);

      rect(0.66 * (2 * edgeSize + (boxSize * columns)), 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);
      if (musicState) {
        musicState = false;
        image(noMusicButton, 0.66 * (2 * edgeSize + (boxSize * columns)), (bottomBorderSize - edgeSize) / 2 + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);
      }

      else if (!musicState) {
        musicState = true;
        image(musicButton, 0.66 * (2 * edgeSize + (boxSize * columns)), (bottomBorderSize - edgeSize) / 2 + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);
      }

      imageMode(CORNER);
      toggleMusic();
    }
  }

  else if (homeScreenState && !settingsScreenState && !creditsScreenState) {
    if (button == "left" && x > 725 && x < 875 && y > 350 && y < 500) {
      homeScreenState = false;
      init();
    }

    else if (button == "left" && x > 20 && x < 120 && y > 730 && y < 830) {
      settingsScreenState = true;
      settingsScreen();
    }

    else if (button == "left" && x > 1480 && x < 1580 && y > 730 && y < 830) {
      creditsScreenState = true;
      creditsScreen();
    }
  }

  else if (homeScreenState && settingsScreenState && !creditsScreenState) {
    if (button == "left" && x > 1480 && x < 1580 && y > 730 && y < 830) {
      bombSlider.remove();
      rowSlider.remove();
      columnSlider.remove();
      settingsScreenState = false;
      homeScreen();
    }
  }

  else if (homeScreenState && !settingsScreenState && creditsScreenState) {
    if (button == "left" && x > 1480 && x < 1580 && y > 730 && y < 830) {
      creditsScreenState = false;
      homeScreen();
    }
  }
}