var cells = [];
var numOfCells = 10;
var bgColor;
var particle;

// let canvas = document.getElementById('c2');
// let renderer = new c2.Renderer(canvas);

// renderer.size(480, 480);
// renderer.background('#cccccc');

// let rect = new c2.Rect(0, 0, 480, 480);
// let rects = rect.split([1, 2, 3, 5, 8], 'squarify');

// renderer.draw(() => {
//   renderer.clear();

//   let mouse = renderer.mouse;
//   let point = new c2.Point(mouse.x, mouse.y);
//   for (let rect of rects) {
//     if (rect.contains(point)) renderer.fill('#ff0000');
//     else renderer.fill(false);
//     renderer.rect(rect);
//   }
// });

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
  background(bgColor);
  ellipse(particle.position.x, particle.position.y, particle.radius, particle.radius);

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
