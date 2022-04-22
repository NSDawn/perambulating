let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyRIGHT, KeyLEFT, stopped;