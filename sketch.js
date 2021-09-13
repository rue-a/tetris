
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



// function drawArray(array){
//   for (let row of array) {
//     for (let cell of row.getRow()){
//       if row 
//     }
//   }
// }

function setup() {

  const width = 400;
  const height = 800;
  const res = 40;
  const margin = 20;
  createCanvas(width, height);
  background(220);
  stroke(100)
  const colors = { 0: 50, 1: 'purple', 2: 'green' }
  const array = new TetrisArray(width, height, res, margin, colors)
  // array.getRow(2).setCell(2, 2)
  // for (i = 0; i < 9; i++) {
  //   array.getRow(5).setCell(i, 1)
  // }
  // array.update()
  array.show()
  let tetrisI = new TetrisI(width, height, res, margin, array)

  tetrisI.show()
  stroke(255)
  drawGrid(width, height, res, margin)

}

function draw() {

}