
function drawGrid(width, height, res, margin) {
  let pos;

  pos = margin;
  while (pos <= width - margin) {
    line(pos, margin, pos, height - margin)
    pos += res;
  }

  pos = margin;
  while (pos <= height - margin) {
    line(margin, pos, width - margin, pos)
    pos += res;
  }
}

function randomStone() {
  let randInt = Math.floor(Math.random() * 2);
  if (randInt == 0) {
    return new TetrisL(width, height, res, margin);
  }
  if (randInt == 1) {
    return new TetrisI(width, height, res, margin);
  }

}

const SPACE = 32;

var startMillis;
var interval;
var array;
var stone;
const width = 400;
const height = 800;
const res = 40;
const margin = 20;

function setup() {
  startMillis = millis();
  interval = 1000;

  createCanvas(width, height);
  background(220);
  stroke(100)

  array = new TetrisArray(width, height, res, margin)
  stone = randomStone()

  array.show()
  stone.show()
  drawGrid(width, height, res, margin)
}

function keyPressed() {
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

  array.update()
  array.show()
  stone.show()
  drawGrid(width, height, res, margin)
}

function draw() {

  if (millis() - startMillis > interval) {
    background(220);
    if (array.checkEligibility(stone.getNextPositions())) {
      stone.incrementRow();
    }
    else {
      for (let pos of stone.getPositions()) {
        array.getRow(pos[1]).setCol(pos[0], stone.getColor());
      }
      delete stone.instance;
      stone = randomStone();
    }
    array.update()
    array.show()
    stone.show()
    drawGrid(width, height, res, margin)
    startMillis = millis()
  }
}