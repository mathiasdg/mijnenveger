/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const canvas_size = 690;
let fireballs = [];
let gravity;

function setup() {
  createCanvas(canvas_size, canvas_size);
  strokeWeight(random(2, 4));
  gravity = createVector(0, 0.22);
}

function draw() {
  background(0, 0, 0, 33);
  // noStroke();
  if (random(1) < 0.022) {
    let position_vector = createVector(random(width), height);
    fireballs.push(new Particle(position_vector));
  }
  // draw 22 points at random places at the bottom of the canvas
  for (let i = 0; i < fireballs.length; ++i) {
    let fb = fireballs[i];
    stroke(fb.color.r, fb.color.g, fb.color.b);
    if (fb.exploded) {
      fb.explode();
      fireballs.splice(i, 1);
    }
    fb.apply_force(gravity);
    fb.update();
    fb.show();
    // console.log(flowers.length);
  }
}
