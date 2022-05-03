/*
    Nishant Suria 
    Alyse Rose
    Stephanie Styffe

    Langorous Perambulator
    05/0X/2022

    Tech Tilt: we made an acelleration and drag system that was not just given to us by the in built physics!
    Art Tilt: we are proud of our own music which stephanie preformed and recorded and mastered, and our sick 
    animations that Nishant made
*/

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