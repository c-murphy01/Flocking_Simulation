class Boid {
    // constructor for each boid
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 2));
        this.acceleration = createVector();
        this.maxForce = 0.1;
        this.maxSpeed = 3;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    // function to align boids with nearby other boids
    align(boids) {
        // variable for perception distance
        let perception = 30;
        // create variable for steer velocity
        let steerVel = createVector();
        // variable for total boids within range
        let total = 0;
        // for each other boid within perception range
        for (let other of boids) {
            // get distance between this boid and other
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            // if within range and not itself
            if (other != this && d < perception) {
                // add its velocity to steering
                steerVel.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            // divide steering velocity by number of other boids within range to get average velocity of flock
            // this is the direction we want boid to turn to
            steerVel.div(total);
            // set magnitude of boid to maxspeed so it changes direction without losing speed
            steerVel.setMag(this.maxSpeed);
            // subtract current velocity from steering
            steerVel.sub(this.velocity);
            // limit amount velocity can change by max force
            steerVel.limit(this.maxForce);
        }
        return steerVel;
    }

    cohesion(boids) {
        // variable for perception distance
        let perception = 30;
        // create variable for steer direction
        let steerDir = createVector();
        // variable for total boids within range
        let total = 0;
        // for each other boid within perception range
        for (let other of boids) {
            // get distance between this boid and other
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            // if within range and not itself
            if (other != this && d < perception) {
                // add its position to steering
                steerDir.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            // divide steering direction by number of other boids within range to get average posiiton of flock
            // this is the direction we want boid to turn to
            steerDir.div(total);
            // subtract current position from steering
            steerDir.sub(this.position);
            // set magnitude of boid to maxspeed so it changes direction without losing speed
            steerDir.setMag(this.maxSpeed);
            // subtract current velocity from steering
            steerDir.sub(this.velocity);
            // limit amount velocity can change by max force
            steerDir.limit(this.maxForce);
        }
        return steerDir;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }

    update() {
        // position is updated by adding velocity
        this.position.add(this.velocity);
        // velocity is updated by adding acceleration
        this.velocity.add(this.acceleration);
        // limit velocity to max speed
        this.velocity.limit(this.maxSpeed);
        //reset acceleration so it doesn't accumulate over time
        this.acceleration.mult(0);
    }

    // show function
    show() {
        // set stroke weight and color
        strokeWeight(8);
        stroke(255);
        // place at boids position
        point(this.position.x, this.position.y);
         
    }
}