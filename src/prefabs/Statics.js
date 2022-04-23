//statics prefab
class Statics extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
    //add object to existing scene
    scene.add.existing(this);
    this.moveSpeed = 3;
    }

    update(stopped,fast){
        //move static right
        if(stopped){
            this.moveSpeed = 0;
        } else if(fast) {
            this.moveSpeed = 6;
        } else {
            this.moveSpeed = 3;
        }
        this.x += this.moveSpeed
        //destroy if mushroom reaches the right side of the screen
        if(this.x >= game.config.width - this.width){
            this.x = 0;
        }
    }
}