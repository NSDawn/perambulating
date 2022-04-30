//statics prefab
class Statics extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,lane) {
        super(scene, x, y, texture, frame,lane);
    
    //add object to existing scene
    scene.add.existing(this);
    this.moveSpeed = 3;
    this.lane = lane;
    this.statlist = ['rock1','rock2','stick1','stick2','stick3'];
    }

    update(stopped,fast,colliding){
        //move static right
        if(stopped){
            this.moveSpeed = 0;
        } else if(colliding) {
            this.moveSpeed = 1;
        } else if(fast){
            this.moveSpeed = 4;
        } else {
            this.moveSpeed = 2
        }
        this.x += this.moveSpeed;
        //
        if(this.x >= game.config.width - this.width){
            this.x = 0;
            this.y = (this.lane * game.config.height/5) + (Math.floor(Math.random()*(game.config.height/5)));
            this.setTexture(this.statlist[Math.floor(Math.random()*this.statlist.length)]);
            //if all the statics are just different frames on 1 file we can make them random each time they reset here.
        }
    }
}