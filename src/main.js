let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 320,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyRIGHT, KeyLEFT;

//reserve stopped and fast and colliding bool flag
let stopped, fast, colliding;

// slime
const MAX_SLIME = 20000;
let slime = MAX_SLIME; 

// difficulty
let difficulty = 0;