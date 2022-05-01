class SlimeBar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 

    }
    preload() {
        // chopping up the spritesheet
        this.load.spritesheet('slimeBar', 'assets/slimeBar.png', { frameWidth: 192, frameHeight: 32 });
    }
    create() {
    }
    update() {

        //console.log(Math.floor(slime / (MAX_SLIME / 60)));
        //this.play("slimeBar_" + String(slime % (MAX_SLIME / 60)));
        //this.play("slimeBar_20");
    }
}