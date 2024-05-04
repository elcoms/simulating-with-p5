function Cell(pos, r, vel, c) {

    
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    this.radius = r || 40;
    this.vel = vel || p5.Vector.random2D().mult(5);
    this.color = c || color(random(150, 255), random(150, 255), random(150, 255), 150);

    this.move = function () {
        if (this.pos.x > width || this.pos.y > height
            || this.pos.x < 0 || this.pos.y < 0) {
            this.vel.mult(-1);
            this.pos.add(this.vel);
        }

        this.pos.add(this.vel);

        stroke(this.color);
        strokeWeight(5);
        line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
    }

    this.show = function () {
        fill(this.color);
        noStroke();

        let diameter = this.radius*2;
        ellipse(this.pos.x, this.pos.y, diameter, diameter);
    }

    this.clicked = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y)
        if (d < this.radius) { return true; }
        else { return false; }
    }

    this.mitosis = function () {
        var cell = new Cell(this.pos, this.radius / 2, p5.Vector.random2D().mult(this.vel.mag()*1.5), this.color);
        return cell;
    }

    this.isColliding = function(otherPos, otherRad) {
        let d = dist(this.pos.x, this.pos.y, otherPos.x, otherPos.y);
        if (d < this.radius + otherRad) {
            let r = this.radius + otherRad;
            return true;
        }
        return false;
    }

    this.addForce = function (pushForce) {
        this.vel.mult(-1);
        this.pos.add(this.vel);
    }
}