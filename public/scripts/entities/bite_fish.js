class BiteFish extends Fish {

  constructor(options) {
    super(options); // Call super to run the code inside `Fish`'s constructor
    this.imageUri = '/images/bruce.png'; // Set the image
    this.isTasty = false; // bitefish are not cannibals

    this.surgeSecondsLeft = 0;
    this.maxSurge = 1.0;
    this.surgMult = 3.0;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);

    const margin = 50;
    // console.log(this.tank.denizens);
    for (let fish in this.tank.denizens) {
      const thisFish = this.tank.denizens[fish];
      // console.log(thisFish, this.proximity(thisFish, margin));
      if (this.proximity(thisFish, margin)) {
        console.log(thisFish);
        thisFish.kill(1.5);
      }
    }
  }

  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge;
    this.makeNewVelocity(50);
  }

  proximity(fish, margin) {
    let xDiff = Math.abs(this.position.x - fish.position.x);
    let yDiff = Math.abs(this.position.y - fish.position.y);
    // console.log({thisX: this.position});
    if (xDiff < margin && yDiff < margin && fish.isTasty) {
      console.log(yDiff, xDiff);
      return true;
    }
    return false;
  }


}
