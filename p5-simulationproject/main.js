var cells = [];
var numOfCells = 10;
var bgColor;
var particle;
var pause = false;

function setup() {
  createCanvas(450, 800);

  particle = new c2.Particle(width/2,height/2);
  particle.radius = 50;

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

  if (pause)
    return;
  
  background(bgColor);
  ellipse(particle.position.x, particle.position.y, particle.radius, particle.radius);

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    if (cell.life <= 0)
      cells.splice(i, 1);
    
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

          if (cellA.color != cellB.color) {
            let newCell = cellA.mitosis(cellB);
            if (newCell) {
                cells.push(newCell);

                if (cellA.radius > cellB.radius)
                  cells.splice(i, 1);
                else if (cellA.radius < cellB.radius)
                  cells.splice(j, 1);
              }
          }
        }
      }
    }
  }
}

function keyPressed() {
  switch (key) {
    case 'r':
      restart();
      break;
      case 'p':
      pause = !pause;
    default:
      break;
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
