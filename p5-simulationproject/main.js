var cells = [];
var numOfCells = 10;
var bgColor;

function setup() {
  createCanvas(450, 800);

  bgColor = color(random(50, 200), random(50, 200), random(50, 200), 150);
  // background('rgba(65%, 85%, 95%, 0.5)');
  background(bgColor);

  for (let i = 0; i < numOfCells; i++) {
    let newVelocity = p5.Vector.random2D();
    cells.push(new Cell());
  }

 console.log("Setup done.");
}

function draw() {
  background(bgColor);

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    
    cell.move();
    cell.show();

    updateCollision();
  }
}

function updateCollision() {
  for (let i = 0; i < cells.length; i++) {
    const cellA = cells[i];
    
    for (let j = 0; j < cells.length; j++) {
      const cellB = cells[j];
      
      if (cellA != cellB) {
        if(cellA.isColliding(cellB.pos, cellB.radius)) {
          // push cells away from each other
          cellA.addForce();
          cellB.addForce();
        }
      }
    }
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
  setup();
}
