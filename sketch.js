// array to hold boids
const flock = [];

// setup canvas
function setup() {
    createCanvas(640, 360);
    // create many boids
    for(i=0; i<50; i++){
        // add new boids to canvas
        flock.push(new Boid());
    }
}

// draw function
function draw() {
    // set background color
    background(50);

    // for each boid in flock, call show func
    for(let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
