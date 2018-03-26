/*
the other launch classes
class BomberLaunch {
  constructor(continent) {

  }
}

class ICBMLaunch {
  constructor(continent) {

  }
}
*/

class SubIcon {
  constructor(x, y, ocean, playerID) {
    this.sprite = phaser.add.sprite(x, y, 'submarine');
    this.sprite.anchor.set(0, 1);
    this.playerID = playerID;
    this.ocean = ocean;
    this.launches = [];
    this.inventory = phaser.add.bitmapText(this.sprite.centerX, this.sprite.position.y, 'closeness', '0', 32);

    // some listeners
    this.sprite.events.onInputDown.add(() => {
      this.launches.push(new SubLaunch(this.playerID, {x: this.sprite.centerX, y: this.sprite.centerY}, this.ocean));
    }, this);

    this.sprite.events.onInputUp.add(() => {
      this.launches[this.launches.length - 1].launch({x: 10, y: 10});
    }, this);

    this.update();
  }

  update() {
    // if the sub's player can be in that ocean
    if (game.oceans[this.ocean].subs[this.playerID]) {
      //check for game state and update inventory accordingly
      if (game.war) {
        this.inventory.setText(game.oceans[this.ocean].subs[this.playerID].total);

        // if they are out of ammo
        if (game.oceans[this.ocean].subs[this.playerID].declared + game.oceans[this.ocean].subs[this.playerID].total <= 0) {
          this.sprite.alpha = 0.2;
          this.inventory.alpha = 0.2;
        } else {
          this.sprite.alpha = 1;
          this.inventory.alpha = 1;
        }
      } else {
        this.inventory.setText(game.oceans[this.ocean].subs[this.playerID].declared);
        // if they are out of ammo
        if (game.oceans[this.ocean].subs[this.playerID].declared <= 0) {
          this.sprite.alpha = 0.2;
          this.inventory.alpha = 0.2;
        } else {
          this.sprite.alpha = 1;
          this.inventory.alpha = 1;
        }
      }
      this.sprite.tint = colors[playerIDs.indexOf(this.playerID)];
      this.inventory.tint = colors[playerIDs.indexOf(this.playerID)];
      this.sprite.inputEnabled = true;
    } else {
      this.sprite.alpha = 0;
      this.inventory.alpha = 0;
    }
  }
}

class CapitalIcon {
  constructor(x, y, continent) {
    this.sprite = phaser.add.sprite(x, y, 'capital');
    this.sprite.anchor.set(0, 1);
    this.sprite.inputEnabled = true;
    this.continent = continent;

    this.hitPoints = phaser.add.bitmapText(this.sprite.centerX, this.sprite.position.y, 'closeness', '0', 32);
    this.hitPoints.position.x = this.sprite.centerX - (this.hitPoints.width / 2);
    this.sprite.tint = colors[playerIDs.indexOf(Object.keys(game.continents[this.continent].player)[0])];
    this.hitPoints.tint = colors[playerIDs.indexOf(Object.keys(game.continents[this.continent].player)[0])];
    this.update();

    this.playerID = null;
  }

  update() {
    console.log('icon updated');
    if (game.war) {
      this.sprite.inputEnabled = true;
    }

    this.hitPoints.setText(game.continents[this.continent].hp);
    this.hitPoints.position.x = this.sprite.centerX - (this.hitPoints.width / 2);
    // if they are out of hit points
    if (game.continents[this.continent].hp <= 0) {
      this.sprite.alpha = 0.2;
      this.hitPoints.alpha = 0.2;
    } else {
      this.sprite.alpha = 1;
      this.hitPoints.alpha = 1;
    }
    this.hitPoints.setText(game.continents[this.continent].hp);
    this.hitPoints.position.x = this.sprite.centerX - (this.hitPoints.width / 2);

    console.log('*** setting sprite tint ***');
    console.log('contintet', this.continent);
    console.log('player owned', game.continents[this.continent].player);
    console.log('player name', Object.keys(game.continents[this.continent].player)[0]);
    console.log('player id', playerIDs.indexOf(Object.keys(game.continents[this.continent].player)[0]));
    console.log('color', colors[playerIDs.indexOf(Object.keys(game.continents[this.continent].player)[0])]);


    this.sprite.tint = colors[playerIDs.indexOf(Object.keys(game.continents[this.continent].player)[0])];
  }
}

class BomberIcon {
  constructor(x, y, continent) {
    this.sprite = phaser.add.sprite(x, y, 'bomber');
    this.sprite.anchor.set(0, 1);
    this.continent = continent;
    this.playerID = Object.keys(game.continents[this.continent].player)[0];
    this.continent = continent;
    this.launches = [];
    this.inventory = phaser.add.bitmapText(this.sprite.centerX, this.sprite.position.y, 'closeness', '0', 32);

    // some listeners
    this.sprite.events.onInputDown.add(() => {
      this.launches.push(new SubLaunch(this.playerID, {x: this.sprite.centerX, y: this.sprite.centerY}, this.ocean));
    }, this);

    this.sprite.events.onInputUp.add(() => {
      this.launches[this.launches.length - 1].launch({x: 10, y: 10});
    }, this);

    this.update();
  }

  update() {
    //check for game state and update inventory accordingly
    if (game.war) {
      this.inventory.setText(game.continents[this.continent].forces.bombers.total);
      this.inventory.position.x = this.sprite.centerX - (this.inventory.width / 2);
      this.sprite.inputEnabled = true;
      // if they are out of ammo
      if (game.continents[this.continent].forces.bombers.total <= 0) {
        this.sprite.alpha = 0.2;
        this.inventory.alpha = 0.2;
      } else {
        this.sprite.alpha = 1;
        this.inventory.alpha = 1;
      }
    } else {
      this.inventory.setText(game.continents[this.continent].forces.bombers.declared);
      this.inventory.position.x = this.sprite.centerX - (this.inventory.width / 2);
      // if they are haven't declared anything
      if (game.continents[this.continent].forces.bombers.declared <= 0) {
        this.sprite.alpha = 0.2;
        this.inventory.alpha = 0.2;
      } else {
        this.sprite.alpha = 1;
        this.inventory.alpha = 1;
      }
    }

    this.sprite.tint = colors[playerIDs.indexOf(this.playerID)];
    this.inventory.tint = colors[playerIDs.indexOf(this.playerID)];
  }
}

class MissileIcon {
  constructor(x, y, continent) {
    this.continent = continent
    this.playerID = Object.keys(game.continents[this.continent].player)[0];
    this.sprite = phaser.add.sprite(x, y, 'missile');
    this.sprite.anchor.set(0, 1);
    this.sprite.tint = colors[playerIDs.indexOf(this.playerID)];
    this.continent = continent;
    this.launches = [];
    this.inventory = phaser.add.bitmapText(this.sprite.centerX, this.sprite.position.y, 'closeness', '0', 32);
    this.inventory.tint = colors[playerIDs.indexOf(this.playerID)];

    // some listeners
    this.sprite.events.onInputDown.add(() => {
      this.launches.push(new SubLaunch(this.playerID, {x: this.sprite.centerX, y: this.sprite.centerY}, this.ocean));
    }, this);

    this.sprite.events.onInputUp.add(() => {
      this.launches[this.launches.length - 1].launch({x: 10, y: 10});
    }, this);

    this.update();
  }

  update() {
    //check for game state and update inventory accordingly
    if (game.war) {
      this.inventory.setText(game.continents[this.continent].forces.icbms.total);
      this.inventory.position.x = this.sprite.centerX - (this.inventory.width / 2);
      this.sprite.inputEnabled = true;

      // if they are out of ammo
      if (game.continents[this.continent].forces.icbms.total <= 0) {
        this.sprite.alpha = 0.2;
        this.inventory.alpha = 0.2;
      } else {
        this.sprite.alpha = 1;
        this.inventory.alpha = 1;
      }
    } else {
      this.inventory.setText(game.continents[this.continent].forces.icbms.declared);
      this.inventory.position.x = this.sprite.centerX - (this.inventory.width / 2);

      // if they are out of ammo
      if (game.continents[this.continent].forces.icbms.declared <= 0) {
        this.sprite.alpha = 0.2;
        this.inventory.alpha = 0.2;
      } else {
        this.sprite.alpha = 1;
        this.inventory.alpha = 1;
      }
    }
  }
}

class Launch {
  // these will be created whenever a players's sub-deploy thing is activated
  constructor(playerID, origin, ocean) {
    // grab our attributes
    this.playerID = playerID;
    this.origin = {x: origin.x, y: origin.y};
    this.ocean = ocean;

    // set up the origin indicator, doesn't move
    if (game.oceans[this.ocean].subs[this.playerID].total > 0) {
      this.originIndicator = phaser.add.sprite(this.origin.x, this.origin.y, 'circle');
      this.originIndicator.tint = colors[playerIDs.indexOf(playerID)];
      this.originIndicator.anchor.set(0.5);


      // some fake stuff for animations that don't exist yet
      this.enrouteCount = 0;
      this.explodingCount = 0;

      // a gear for animations
      this.frame = 0;

      // to keep track of the countdown timer
      this.delay = 3;
      this.count = 0;

      // first we start aiming
      this.state = 'aiming';
    } else {
      // or we don't have any subs
      this.state = 'impossible';
    }
  }

  // the method to call on every game loop iteration, calls a method depending on state
  update() {
    this.frame++;
    this[this.state]();
  }

  // a weapon has been selected, launch is pending
  aiming() {
    let theta = (this.frame / 15)
    this.originIndicator.scale.set((Math.sin(theta) + 2) / 5);
    this.originIndicator.alpha = (Math.sin(theta + Math.PI) + 2) / 3;
  }

  // when user paints a destination
  launch(capital) {
    // check if the destination is valid first
    if (capital.playerID != this.playerID && game.continents[continent].hp > 0) {
      this.targetIndicator = phaser.add.sprite(capital.sprite.position.x, capital.sprite.position.y, 'circle');
      this.targetIndicator.tint = colors[playerIDs.indexOf(playerID)];
      this.targetIndicator.anchor.set(0.5);
    }

    this.state = 'countdown';

    // set up the countdown indicator
    // this.countdownIndicator = phaser.add.sprite(origin.x, origin.y, 'circle');
    // this.countdownIndicator.tint = player.color;
    // this.countdownIndicator.anchor.set(0.5);
    // this.countdownIndicator.position = this.origin;
  }

  // after a destination is verified, start the countdown
  countdown() {
    let theta = (this.frame / 15)
    // figure out which of the launch points to use
    // start the countdown clock and animation
    // when the countdown is over, this.state = 'enroute'
    if (this.count > this.delay * 60) {
      this.state = 'enroute';
    } else {
      this.count++;
      // continue countdown animation
      this.targetIndicator.scale.set((Math.sin(theta) + 2) / 5);
      this.targetIndicator.alpha = (Math.sin(theta + Math.PI) + 2) / 3;
    }
  }

  // while the missile is traveling
  enroute() {
    // fakeit
    console.log('enroute');
    this.enrouteCount++;
    if (this.enrouteCount > 3 * 60) {
      this.state = 'exploding';
    }
    // start the launch animation
    // when it gets to the destination, this.state = 'exploding'
  }

  // while the explosion animation is happening
  exploding() {
    console.log('exploding');
    this.explodingCount++;
    if (this.explodingCount > 1 * 60) {
      this.state = 'exploded';
    }
    // when the missile gets to the destination
    // get rid of the
    // ocean.subs[player.name].total--;
    // if (ocean.subs[player.name].declared > 0) {
    //   ocean.subs[player.name].declared--;
    // }
    // when done exploding, this.state = 'exploded'
  }

}

/*
game loop
*/
function update() {
  // handle all the launch stuff
  subIcons.forEach(subIcon => {
    subIcon.launches.forEach(launch => {
      if (launch.state === 'impossible') {
        // show a dialog that indicates out of ammo
        console.log('impossible');
      } else
      if (launch.state === 'exploded') {
        subIcon.launches.shift();
        console.log(subIcon.launches);
      } else {
        launch.update();
      }
    });
  });
}

class PlayerPointer {
  constructor(index, state) {
    this.playerIndex = index;
    this.sprite = state.game.add.sprite(0, 0, 'circle');
    this.sprite.tint = colors[index];
    // this.sprite.alpha = 0;
    this.sprite.scale.set(0.2);
    this.intersection = null;
  }

  setPosition() {
    this.sprite.position = lasers[this.playerIndex] || {x: 0,y: 0};
  }

  intersecting() {
    if (this.intersection) {
      if (!this.intersection.checkOverlap()) {
        this.intersection = null;
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  checkIntersection(targetSprite, action, data) {
    if (this.sprite.overlap(targetSprite)) {
      this.intersection = new Intersection(this.sprite, targetSprite, action, data);
      return true;
    }

    return false;
  }
}

class Intersection {
  constructor(playerSprite, targetSprite, action, data) {
    this.playerSprite = playerSprite;
    this.targetSprite = targetSprite;
    this.action = action;
    this.data = data;
    this.count = 0;
  }

  checkOverlap() {
    if (this.playerSprite.overlap(this.targetSprite)) {
      this.count++;
      if (this.count > 60) {
        this.action(this.data);
        return false;
      };

      return true;
    } else {
      return false;
    }
  }
}
