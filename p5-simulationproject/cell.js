function Cell() {
    this.pos = createVector(random(width), random(height));
    this.r = 50;
    this.vel = p5.Vector.random2D();
    this.color = color(random(100, 255), 0 , random(100, 255));

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
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}