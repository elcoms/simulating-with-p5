var cells = [];
var numOfCells = 10;

function setup() {
  createCanvas(450, 800);
  background('rgba(65%, 85%, 95%, 0.5)');
  for (let i = 0; i < numOfCells; i++) {
    cells.push(new Cell());
  }

 console.log("Setup done.");
}

function draw() {
  background('rgba(25%, 55%, 75%, 0.5)');

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    
    cell.move();
    cell.show();
  }
}

function keyPressed() {
  if (key === 'r') {
    restart();
  }
}

function mousePressed() {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (cell.clicked(mouseX, mouseY)) {
      cells.push(cell.mitosis());
      cells.push(cell.mitosis());
      // cells.splice(i, 1);
    }
    
  }
}

function restart() {
  cells = [];

  for (let i = 0; i < numOfCells; i++) {
    cells.push(new Cell());
  }
}
