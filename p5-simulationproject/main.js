var cells = [];
var numOfCells = 3;

function setup() {
 createCanvas(400, 400);
 
  for (let i = 0; i < numOfCells; i++) {
    cells.push(new Cell());
  }

 console.log("Setup done.");
}

function draw() {
  background(51);

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    
    cell.move();
    cell.show();
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
