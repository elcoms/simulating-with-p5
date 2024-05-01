function Cell(pos, r, vel, c) {

    
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    this.radius = r || 50;
    this.vel = vel || p5.Vector.random2D();
    this.color = c || color(random(150, 255), random(150, 255), random(150, 255), 100);

    this.move = function () {
        this.pos.add(this.vel);

        if (this.pos.x > width || this.pos.y > height
            || this.pos.x < 0 || this.pos.y < 0) {
            this.vel = p5.Vector.random2D();
        }
    }

    this.show = function () {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    this.clicked = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y)
        if (d < this.radius) { return true; }
        else { return false; }
    }

    this.mitosis = function () {
        var cell = new Cell(this.pos, this.radius / 2, this.vel * 2, this.color);
        return cell;
    }
}