class FlowerParticle {
  constructor(position) {
    // position is of type p5.Vector
    this.pos = position;
    this.vel = createVector(random(-3, 3), random(-3, 3));
    // this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    // this.color = color;
  }

  apply_force() {
    this.acc.add(0.11);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(random(1, 2.69));
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  show() {
    point(this.pos.add(this.vel));
  }
}
