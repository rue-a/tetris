
async function postJSON(data) {
  const response = await fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(data)
  })
  return response.json();
}

async function getJSON() {
  const response = await fetch('/api/get');
  return response.json();
}

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
      score += 200
    }
    if (popped == 2) {
      score += 300
    }
    if (popped == 3) {
      score += 500
    }
    if (popped == 4) {
      score += 1000
    }
    popCounter += popped;
    // make game faster every 10 pops
    if (popped) {
      if (popCounter >= 10) {
        interval = (2 * interval) / 3
        popCounter -= 10;
      }
    }

    array.show();
    stone.show();
    array.drawGrid();
    startMillis = millis();
  }
  return true;
}

function jsonToTable(data) {
  let lines = []
  for (let key of Object.keys(data)) {
    let score = (Object.keys(data[key]))[0];

    lines.push(data[key][score] + ' : ' + score + '\n');
  }
  return lines;
}

const SPACE = 32;

var score = 0;
var popCounter = 0;
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

function draw() {
  textSize(18);
  textAlign(RIGHT, TOP);
  fill('white');
  noStroke()
  text(score, width - 10, 0)
  // text(popCounter, width / 2, 0)
  // text(interval, 10, 0)
  console.log(interval)


  if (!(gameLoop())) {
    noLoop();
    array.update();
    array.show();
    background(0, 0, 0, 30);
    textAlign(CENTER, CENTER);
    textSize(64);
    noStroke();
    fill('white');
    text('YOU LOST!', width / 2, height / 3);
    textSize(20)
    text('Your score is ' + score + '!', width / 2, height / 3 + 35);
    getJSON().then(getResponse => {
      // console.log(getResponse)
      if (getResponse['status'] == 'success') {
        const getMsg = getResponse['msg'];
        const lowestHighscore = Object.keys(getMsg['5'])[0]
        if (score > lowestHighscore) {
          const contender = { 'name': 'player', 'score': score }
          postJSON(contender).then(postResponse => {
            // console.log(postResponse);
            if (postResponse['status'] == 'success') {
              const postMsg = postResponse['msg'];
              const table = jsonToTable(postMsg['highscore']);
              textAlign(CENTER, CENTER);
              textSize(16)
              for (let index in table) {
                if (index == postMsg['placement'] - 1) {
                  fill('salmon');
                  text(table[index], (width / 2), (height / 2) + (20 * index));
                }
                else {
                  fill('white');
                  text(table[index], (width / 2), (height / 2) + (20 * index));
                }
              }
            }
          });
        }
        else {
          const table = jsonToTable(getMsg)
          textAlign(CENTER, CENTER);
          textSize(16)
          for (let index in table) {
            text(table[index], (width / 2), (height / 2) + (20 * index));
          }
        }
      }
    })
  }
}