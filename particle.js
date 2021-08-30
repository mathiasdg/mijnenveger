/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Particle {
  constructor(position, sound_effects) {
    // position is of type p5.Vector
    this.pos = position;
    this.vel = createVector(
      random(-0.69, 0.69),
      map(random(-16, -21), -16, -21, 0, height)
    );
    this.acc = createVector(0, 0);
    this.exploded = false;
    this.color = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    };
    this.amount_of_flowers = random(69, 122);
    this.flowers = [];
    if (Math.random() < 0.5) {
      this.sound = sound_effects.launch[0];
    } else {
      this.sound = sound_effects.launch[1];
    }
    this.sound.play();
  }

  apply_force(force) {
    this.acc.add(force);
  }

  explode() {
    if (Math.random() < 0.5) {
      this.sound = sound_effects.explode[0];
    } else {
      this.sound = sound_effects.explode[1];
    }
    this.sound.play();
    for (let i = 0; i < this.amount_of_flowers; ++i) {
      let f = new FlowerParticle(this.pos);
      this.flowers.push(f);
    }
    // console.log(this.flowers);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.vel.y >= 0) {
      this.exploded = true;
    }
  }
  show() {
    if (!this.exploded) {
      point(this.pos);
    } else {
      for (let i = 0; i < this.flowers.length; ++i) {
        strokeWeight(random(2, 4.4));
        this.flowers[i].apply_force();
        this.flowers[i].update();
        this.flowers[i].show();
      }
    }
  }
}
