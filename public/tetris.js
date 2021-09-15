

function randomStone() {
  let randInt = Math.floor(Math.random() * 7);
  if (randInt == 0) {
    return new TetrisL(width, height, res, margin);
  }
  if (randInt == 1) {
    return new TetrisI(width, height, res, margin);
  }
  if (randInt == 2) {
    return new TetrisJ(width, height, res, margin);
  }
  if (randInt == 3) {
    return new TetrisS(width, height, res, margin);
  }
  if (randInt == 4) {
    return new TetrisZ(width, height, res, margin);
  }
  if (randInt == 5) {
    return new TetrisO(width, height, res, margin);
  }
  if (randInt == 6) {
    return new TetrisT(width, height, res, margin);
  }


}

const SPACE = 32;

var highscore = 0;
var poppedRows = 0;
var interval = 1000;
var lost = false;
var startMillis;

var array;
var stone;
const width = 400;
const height = 720;
const res = 40;
const margin = 20;

function setup() {
  startMillis = millis();

  createCanvas(width, height);
  background(220);
  stroke(100)

  array = new TetrisArray(width, height, res, margin)
  stone = randomStone()
  // stone = new TetrisT(width, height, res, margin);

  array.show()
  stone.show()
  array.drawGrid()
}

function keyPressed() {
  if (!(lost)) {
    if (keyCode === LEFT_ARROW) {
      if (array.checkEligibility(stone.getNextPositions('left'))) {
        stone.decrementCol();
      }
    }

    if (keyCode === RIGHT_ARROW) {
      if (array.checkEligibility(stone.getNextPositions('right'))) {
        stone.incrementCol();
      }
    }

    if (keyCode === DOWN_ARROW) {
      if (array.checkEligibility(stone.getNextPositions())) {
        stone.incrementRow();
      }
    }

    if (keyCode === SPACE) {
      if (array.checkEligibility(stone.getNextPositions('rotate'))) {
        stone.rotate();
      }
    }
    array.show();
    stone.show();
    array.drawGrid();
  }

  // any key for new game
}

function gameLoop() {
  if (millis() - startMillis > interval) {
    if (array.checkEligibility(stone.getNextPositions())) {
      stone.incrementRow();
    }
    else {
      for (let pos of stone.getPositions()) {
        if (pos[1] < 0) {
          lost = true;
          return false;
        }
        array.getRow(pos[1]).setCol(pos[0], stone.getColor());
      }
      delete stone.instance;
      stone = randomStone();
    }
    background(220)
    let popped = array.update();
    if (popped == 1) {
      highscore += 200
    }
    if (popped == 2) {
      highscore += 300
    }
    if (popped == 3) {
      highscore += 500
    }
    if (popped == 4) {
      highscore += 1000
    }
    poppedRows += popped;
    // make game faster every 10 pops
    if (popped) {
      if (poppedRows >= 10) {
        interval = (2 * interval) / 3
        poppedRows -= 10;
      }
    }

    array.show();
    stone.show();
    array.drawGrid();
    startMillis = millis();
  }
  return true;
}

function draw() {
  textSize(18);
  textAlign(RIGHT, TOP);
  fill('salmon');
  noStroke()
  text(highscore, width - 10, 0)
  // text(poppedRows, width / 2, 0)
  // text(interval, 10, 0)
  console.log(interval)


  if (!(gameLoop())) {

    array.update();
    array.show();
    background(0, 0, 0, 30);
    textAlign(CENTER, CENTER);
    textSize(64);
    noStroke();
    fill('white');
    text('YOU LOST!', width / 2, height / 2);
    textSize(16)
    text('Your Highscore is: ' + highscore, width / 2 + 40, height / 2 + 40);

  }

}