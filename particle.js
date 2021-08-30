class Particle {
  constructor(position) {
    // position is of type p5.Vector
    this.pos = position;
    this.vel = createVector(random(-0.69, 0.69), random(-15, -17));
    this.acc = createVector(0, 0);
    this.exploded = false;
    this.color = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    };
    this.amount_of_flowers = random(69, 122);
    this.flowers = [];
  }

  apply_force(force) {
    this.acc.add(force);
  }

  explode() {
    for (let i = 0; i < this.amount_of_flowers; ++i) {
      let f = new FlowerParticle(this.pos);
      this.flowers.push(f);
    }
    console.log(this.flowers);
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
        strokeWeight(random(1.5, 3));
        this.flowers[i].apply_force();
        this.flowers[i].update();
        this.flowers[i].show();
      }
    }
  }
}
