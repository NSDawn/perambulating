//slug prefab
class Slug extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add slug to existing scene
        scene.add.existing(this); //add to existing, displayList, updateList
        this.moveSpeed = 0; //movespeed for up or down pixels per frame
        this.speedMax = 3;
        this.speedRate = 0.01;

    }

    update(stopped){
        if(!stopped){
        if(keyUP.isDown && this.y >= this.height + 32){
            if(this.moveSpeed<this.speedMax){
                this.moveSpeed+= this.speedRate;
            }
            this.speedRate+= 0.02;
            this.y -= this.moveSpeed;
        } else if (keyDOWN.isDown && this.y <= game.config.height -this.height - 32){
            if(this.moveSpeed<this.speedMax){
                this.moveSpeed+= this.speedRate;
            }
            this.speedRate+= 0.02;
            this.y += this.moveSpeed;
        }
        if(Phaser.Input.Keyboard.JustUp(keyUP)||Phaser.Input.Keyboard.JustUp(keyDOWN)){
            this.moveSpeed = 0;
            this.speedRate = 0.01;
        }
    }
    }
}