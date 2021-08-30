/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const canvas_size = 690;
let fireballs = [];
let gravity;
let sound_effects = {
  launch: [],
  explode: []
};
// let sounds = [
//   "/sound/firework_distant_explosion.mp3",
//   "/sound/firework_medium_distant_explosion.mp3",
//   "/sound/firework_small_launch_eject_002.mp3"
// ];

function preload() {
  sound_effects.launch[0] = loadSound(
    "sound/firework_rocket_small_launch_002.mp3"
  );
  sound_effects.launch[1] = loadSound(
    "sound/firework_small_launch_eject_002.mp3"
  );
  sound_effects.explode[0] = loadSound("sound/firework_distant_explosion.mp3");
  sound_effects.explode[1] = loadSound(
    "sound/firework_medium_distant_explosion.mp3"
  );
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(canvas_size, canvas_size);
  strokeWeight(random(2, 4));
  gravity = createVector(0, 0.22);
}

function draw() {
  background(0, 0, 0, 44);
  // noStroke();
  if (random(1) < 0.0069) {
    let position_vector = createVector(random(width), height);
    fireballs.push(new Particle(position_vector, sound_effects));
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
