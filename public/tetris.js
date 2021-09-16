
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
      score += 500
    }
    if (popped == 3) {
      score += 900
    }
    if (popped == 4) {
      score += 1300
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

function showHighscore(div, highscore, playerPlacement = null) {
  const highscoreLines = []
  for (let key of Object.keys(highscore)) {
    const score = Object.keys(highscore[key])[0];
    highscoreLines.push([highscore[key][score], score]);
  }

  for (let placement_index in highscoreLines) {
    const placement = highscoreLines[placement_index]
    const placement_text = createElement('p', placement[0] + ' : ' + placement[1]);
    placement_text.parent(div);
    placement_text.addClass('tetris-text');
    if (placement_index == playerPlacement - 1) {
      placement_text.addClass('current-placement')
    }
  }
}



const SPACE = 32;

var score = 0;
var popCounter = 0;
var interval = 1000;
var lost = false;
var startMillis;

var canvas;
var array;
var stone;
const width = 400;
const height = 720;
const res = 40;
const margin = 20;



function setup() {
  startMillis = millis();

  canvas = createCanvas(width, height);
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
    // if (true) {
    noLoop();
    array.update();
    array.show();
    background(0, 0, 0, 30);
    textAlign(CENTER, CENTER);
    textSize(64);
    noStroke();

    const highscore_div = createElement('div', '')
    highscore_div.addClass('highscore')
    highscore_div.position(40, height / 3)
    const lost_html = createElement('p', 'YOU LOST!')
    lost_html.parent(highscore_div)
    lost_html.addClass('lost tetris-text')
    const score_html = createElement('p', 'Your score is ' + score + '.')
    score_html.parent(highscore_div)
    score_html.addClass('score tetris-text')

    getJSON().then(getResponse => {
      // console.log(getResponse)
      if (getResponse['status'] == 'success') {
        const getMsg = getResponse['msg'];
        const lowestHighscore = Object.keys(getMsg['5'])[0]
        if (score > lowestHighscore) {
          const name = prompt();
          const contender = { 'name': name, 'score': score }
          postJSON(contender).then(postResponse => {
            if (postResponse['status'] == 'success') {
              const postMsg = postResponse['msg'];
              showHighscore(
                highscore_div, postMsg['highscore'], postMsg['placement']
              );
            }
          });
        }
        else {
          showHighscore(highscore_div, getMsg);
        }
      }
    })
  }
}