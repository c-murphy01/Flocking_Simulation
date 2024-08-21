class Boid {
    // constructor for each boid
    constructor() {
        this.position = createVector(width/2, height/2);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5,1.5));
        this.acceleration = createVector();

    }

    // function to align boids with nearby other boids
    align(boids) {
        let avg = createVector();
        for (let other of boids) {
            avg.add(other.velocity);
        }
    }

    update() {
        // position is updated by adding velocity
        this.position.add(this.velocity);
        // velocity is updated by adding acceleration
        this.velocity.add(this.acceleration);
    }

    // show function
    show() {
        // set stroke weight and color
        strokeWeight(16);
        stroke(255);
        // place at boids position
        point(this.position.x, this.position.y);
         
    }
}