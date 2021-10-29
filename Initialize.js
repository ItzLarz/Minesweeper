document.oncontextmenu = function () {
  return false;
};

const bombs = 30;
const columns = 40;
const rows = 20;
const boxSize = 30;
const edgeSize = 10;
const topBorderSize = columns * 3.33;
const bottomBorderSize = columns * 1.66;
const buttonSize = bottomBorderSize / 1.2;

var squares = [];
var bombList = [];
var uncoverList = [];
var gameOver = false;
var win = false;
var defeat = false;
var gamePlaying = false;
var bombCount = bombs;
var interval = 0;
var minutes = 0;
var seconds = 0;
var spacer = "0";
var musicState = false;
var homeScreenState = true;
var settingsScreenState = false;
var creditsScreenState = false;

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
let home;
let musicButton;
let noMusicButton;

function preload() {
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
  homeButton = loadImage("img/home.png");
  musicButton = loadImage("img/music.png");
  noMusicButton = loadImage("img/nomusic.png");
  stock = loadImage("img/stock.png");
  play = loadImage("img/play.png");
  settings = loadImage("img/settings.png");
  credits = loadImage("img/credits.png");
  
  soundFormats("mp3");
  music = loadSound("sound/music.mp3");
  music2 = loadSound("sound/music2.mp3");
  music3 = loadSound("sound/music3.mp3");
  music4 = loadSound("sound/music4.mp3");
  music5 = loadSound("sound/music5.mp3");
  
}

function setup() {
  createCanvas(0, 0);
  homeScreen();
}

function draw() {
  if (!gameOver && !homeScreenState && gamePlaying) {
    if (millis() - interval >= 1000) {
      interval = millis();
      seconds += 1;
      textAlign(CENTER);
      textSize(columns);
      strokeWeight(0);
      fill(200);
      rect(edgeSize + (boxSize * columns) / 1.2, topBorderSize / 1.55, columns * 6, topBorderSize - topBorderSize / 1.4);
      fill(0);

      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      if (seconds >= 10) {
        spacer = "";
      }

      else {
        spacer = 0;
      }

      text(minutes + ":" + spacer + seconds, edgeSize + (boxSize * columns) / 1.2, topBorderSize / 1.33);
    }
  }
}

function init() {
  squares = [];
  bombList = [];
  uncoverList = [];
  gameOver = false;
  win = false;
  defeat = false;
  gamePlaying = false;
  bombCount = bombs;
  interval = 0;
  minutes = 0;
  seconds = -1;
  spacer = "0";

  resizeCanvas(2 * edgeSize + (boxSize * columns), topBorderSize + bottomBorderSize + 2 * edgeSize + (boxSize * rows));
  background(100);
  drawField();
  selectBombs();
  calcValue();
  drawBorders();
  console.log(squares);
}

function homeScreen() {
  resizeCanvas(1600, 850);
  background(100);
  image(stock, 0, 0, 1600, 850);

  imageMode(CENTER);
  image(play, 800, 425, 150, 150);

  imageMode(CORNER);
  image(settings, 20, 730, 100, 100);
  image(credits, 1480, 730, 100, 100);
  
}

function settingsScreen() {
  imageMode(CORNER);
  image(stock, 0, 0, 1600, 850);
  image(homeButton, 1480, 730, 100, 100);
}

function creditsScreen() {
  imageMode(CORNER);
  image(stock, 0, 0, 1600, 850);
  image(homeButton, 1480, 730, 100, 100);
}

function gameOverScreen() {
  if (defeat) {
    fill(200);
    stroke(170);
    strokeWeight(5);
    rectMode(CENTER);
    rect(edgeSize + (boxSize * columns) / 2, topBorderSize / 2, columns * 6.66, topBorderSize - topBorderSize / 10, columns);

    textAlign(CENTER);
    textSize(columns * 1.3);
    fill(0);
    strokeWeight(0);
    text("Try again?", edgeSize + (boxSize * columns) / 2, topBorderSize / 1.6)
  }

  if (win) {
    fill(200);
    stroke(170);
    strokeWeight(5);
    rectMode(CENTER);
    rect(edgeSize + (boxSize * columns) / 2, topBorderSize / 2, columns * 6.66, topBorderSize - topBorderSize / 10, columns);

    textAlign(CENTER);
    textSize(columns * 1.3);
    fill(0);
    strokeWeight(0);
    text("You won!", edgeSize + (boxSize * columns) / 2, topBorderSize / 1.6)
  }
}

function drawField() {
  for (i = 0; i < columns; i++) {
    let tempList = [];
    for (j = 0; j < rows; j++) {
      let object = new Object();
      object.col = i;
      object.row = j;
      object.rawx = edgeSize + (i * boxSize);
      object.rawy = topBorderSize + edgeSize + (j * boxSize);
      object.bomb = false;
      object.covered = true;
      object.marked = false;
      object.value = 0;
      tempList.push(object);
      image(squareBlank, object.rawx, object.rawy, boxSize, boxSize);
    }
    squares.push(tempList);
  }
}

function selectBombs() {
  while (bombList.length < bombs) {
    let pickedLine = random(squares);
    let pickedSquare = random(pickedLine);
    if (pickedSquare.bomb != true) {
      bombList.push(pickedSquare);
      pickedSquare.bomb = true;
      pickedSquare.value = null;
    }
  }
}

function calcValue() {
  for (i = 0; i < columns; i++) {
    for (j = 0; j < rows; j++) {
      let countBombs = 0;
      if (squares[i][j].bomb == true) {
        continue;
      }

      // Upper left corner
      if (i == 0 && j == 0) {
        if (squares[0][1].bomb == true) { countBombs++; }
        if (squares[1][0].bomb == true) { countBombs++; }
        if (squares[1][1].bomb == true) { countBombs++; }
      }

      // Upper right corner
      else if (i == columns - 1 && j == 0) {
        if (squares[columns - 2][0].bomb == true) { countBombs++; }
        if (squares[columns - 1][1].bomb == true) { countBombs++; }
        if (squares[columns - 2][1].bomb == true) { countBombs++; }
      }

      // Bottom left corner
      else if (i == 0 && j == rows - 1) {
        if (squares[0][rows - 2].bomb == true) { countBombs++; }
        if (squares[1][rows - 1].bomb == true) { countBombs++; }
        if (squares[1][rows - 2].bomb == true) { countBombs++; }
      }

      // Bottom right corner
      else if (i == columns - 1 && j == rows - 1) {
        if (squares[columns - 1][rows - 2].bomb == true) { countBombs++; }
        if (squares[columns - 2][rows - 1].bomb == true) { countBombs++; }
        if (squares[columns - 2][rows - 2].bomb == true) { countBombs++; }
      }

      // Left wall
      else if (i == 0 && j != 0) {
        if (squares[i][j - 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j - 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j].bomb == true) { countBombs++; }
        if (squares[i + 1][j + 1].bomb == true) { countBombs++; }
        if (squares[i][j + 1].bomb == true) { countBombs++; }
      }

      // Right wall
      else if (i == columns - 1 && j != 0) {
        if (squares[i][j - 1].bomb == true) { countBombs++; }
        if (squares[i - 1][j - 1].bomb == true) { countBombs++; }
        if (squares[i - 1][j].bomb == true) { countBombs++; }
        if (squares[i - 1][j + 1].bomb == true) { countBombs++; }
        if (squares[i][j + 1].bomb == true) { countBombs++; }
      }

      // Upper wall
      else if (i != 0 && j == 0) {
        if (squares[i - 1][j].bomb == true) { countBombs++; }
        if (squares[i - 1][j + 1].bomb == true) { countBombs++; }
        if (squares[i][j + 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j + 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j].bomb == true) { countBombs++; }
      }

      // Bottom wall
      else if (i != 0 && j == rows - 1) {
        if (squares[i - 1][j].bomb == true) { countBombs++; }
        if (squares[i - 1][j - 1].bomb == true) { countBombs++; }
        if (squares[i][j - 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j - 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j].bomb == true) { countBombs++; }
      }

      // Rest of the squares
      else if (i < columns && j < rows) {
        if (squares[i - 1][j].bomb == true) { countBombs++; }
        if (squares[i - 1][j - 1].bomb == true) { countBombs++; }
        if (squares[i][j - 1].bomb == true) { countBombs++; }
        if (squares[i + 1][j - 1].bomb == true) { countBombs++; }

        if (squares[i + 1][j].bomb == true) { countBombs++; }
        if (squares[i + 1][j + 1].bomb == true) { countBombs++; }
        if (squares[i][j + 1].bomb == true) { countBombs++; }
        if (squares[i - 1][j + 1].bomb == true) { countBombs++; }
      }
      squares[i][j].value = countBombs;
    }
  }
}

function drawBorders() {
  fill(200);
  stroke(170);
  strokeWeight(5);
  rectMode(CENTER);

  rect(edgeSize + (boxSize * columns) / 6, topBorderSize / 2, columns * 6.66, topBorderSize - topBorderSize / 10, columns);
  rect(edgeSize + (boxSize * columns) / 2, topBorderSize / 2, columns * 6.66, topBorderSize - topBorderSize / 10, columns);
  rect(edgeSize + (boxSize * columns) / 1.2, topBorderSize / 2, columns * 6.66, topBorderSize - topBorderSize / 10, columns);

  textAlign(CENTER);
  textSize(columns * 1.5);
  fill(0);
  strokeWeight(0);

  text("Reset", edgeSize + (boxSize * columns) / 2, topBorderSize / 1.5);

  textSize(columns);

  text("Bombs:", edgeSize + (boxSize * columns) / 6, topBorderSize / 2.2);
  text(bombCount, edgeSize + (boxSize * columns) / 6, topBorderSize / 1.33);
  text("Time:", edgeSize + (boxSize * columns) / 1.2, topBorderSize / 2.2);
  text("0:00", edgeSize + (boxSize * columns) / 1.2, topBorderSize / 1.33);

  imageMode(CENTER);
  image(homeButton, 0.33 * (2 * edgeSize + (boxSize * columns)), 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);

  if (musicState) {
    image(musicButton, 0.66 * (2 * edgeSize + (boxSize * columns)), 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);
  }

  else if (!musicState) {
    image(noMusicButton, 0.66 * (2 * edgeSize + (boxSize * columns)), 0.5 * bottomBorderSize + topBorderSize + 2 * edgeSize + (boxSize * rows), buttonSize, buttonSize);
  }

  imageMode(CORNER);
}

function toggleMusic() {
  if (music.isLoaded()) {
    if (musicState) {
      music.loop();
    }

    else if (!musicState) {
      music.pause();
    }
  }
}
