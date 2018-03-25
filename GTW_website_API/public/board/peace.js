let peace = {
  preload: function() {
    this.game.load.image('map', '/board/assets/map.png');
    this.game.load.image('capital', '/board/assets/capital.png');
    this.game.load.bitmapFont('closeness', '/board/assets/fonts/closeness.png', '/board/assets/fonts/closeness.fnt');
    this.game.load.image('missile', '/board/assets/missile.png');
    this.game.load.image('submarine', '/board/assets/submarine.png');
    this.game.load.image('bomber', '/board/assets/bomber.png');
    this.game.load.image('circle', '/board/assets/circle.png');
    this.game.load.image('ring', '/board/assets/ring.png');
  },
  create: function() {
    phaser.add.sprite(0, 0, 'map');

    /*
    sub icons
    */
    subIcons = [
      new SubIcon(130, (1080 - 310), 'pacific', playerIDs[0]),
      new SubIcon(175, (1080 - 215), 'pacific', playerIDs[1]),
      new SubIcon(220, (1080 - 120), 'pacific', playerIDs[2]),
      new SubIcon(625, (1080 - 435), 'atlantic', playerIDs[0]),
      new SubIcon(690, (1080 - 330), 'atlantic', playerIDs[1]),
      new SubIcon(755, (1080 - 225), 'atlantic', playerIDs[2]),
      new SubIcon(1250, (1080 - 265), 'indian', playerIDs[0]),
      new SubIcon(1250, (1080 - 180), 'indian', playerIDs[1]),
      new SubIcon(1250, (1080 - 95), 'indian', playerIDs[2]),
    ];

    bomberIcons = [];
    capitalIcons = [];
    missileIcons = [];

    // North America
    bomberIcons.push(new BomberIcon(260, (1080 - 500), 'northAmerica'));
    capitalIcons.push(new CapitalIcon(365, (1080 - 500), 'northAmerica'));
    missileIcons.push(new MissileIcon(470, (1080 - 500), 'northAmerica'));

    // South America
    bomberIcons.push(new BomberIcon(495, (1080 - 285), 'southAmerica'));
    capitalIcons.push(new CapitalIcon(560, (1080 - 200), 'southAmerica'));
    missileIcons.push(new MissileIcon(540, (1080 - 90), 'southAmerica'));

    // Asia
    bomberIcons.push(new BomberIcon(1320, (1080 - 470), 'asia'));
    capitalIcons.push(new CapitalIcon(1425, (1080 - 470), 'asia'));
    missileIcons.push(new MissileIcon(1530, (1080 - 470), 'asia'));

    // Europe
    bomberIcons.push(new BomberIcon(990, (1080 - 565), 'europe'));
    capitalIcons.push(new CapitalIcon(1095, (1080 - 565), 'europe'));
    missileIcons.push(new MissileIcon(1200, (1080 - 565), 'europe'));

    // Australia
    bomberIcons.push(new BomberIcon(1530, (1080 - 180), 'australia'));
    capitalIcons.push(new CapitalIcon(1635, (1080 - 180), 'australia'));
    missileIcons.push(new MissileIcon(1740, (1080 - 180), 'australia'));

    // Africa
    bomberIcons.push(new BomberIcon(850, (1080 - 365), 'africa'));
    capitalIcons.push(new CapitalIcon(955, (1080 - 365), 'africa'));
    missileIcons.push(new MissileIcon(1060, (1080 - 365), 'africa'));
  },
  update: function() {
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
}
