//slug prefab
class Slug extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add slug to existing scene
        scene.add.existing(this); //add to existing, displayList, updateList
        this.moveSpeed = 0; //movespeed for up or down pixels per frame
        this.speedMax = 3; //max speed pixels per frame
        this.speedRate = 0.01; //variable for rate that speed changes per frame
        this.speedRateplyr = 1.2;

    }

    update(stopped){
        if(KeyLEFT.isDown){
            this.speedMax = 9; 
            this.speedRateplyr = 2.4;
         } else if(Phaser.Input.Keyboard.JustUp(KeyLEFT)) {
             this.speedMax = 3;
             this.speedRateplyr = 1.2;
         }
        if(!stopped){    
        if(keyUP.isDown && this.y >= this.height + 32){ // if we are not at the top
            if(this.moveSpeed<this.speedMax){ // and we aren't at max speed
                this.moveSpeed+= this.speedRate; // increase the speed by the rate
            }
            this.speedRate*= this.speedRateplyr; // increase the rate
            this.y -= this.moveSpeed; // move up by the speed
        } else if (keyDOWN.isDown && this.y <= game.config.height -this.height - 32){ //else if we aren't at the bottom
            if(this.moveSpeed<this.speedMax){ //and we aren't at the max speed
                this.moveSpeed+= this.speedRate; // increase the speed by the rate
            }
            this.speedRate*= this.speedRateplyr; // increase the rate
            this.y += this.moveSpeed; // move down by the speed
        }
        if(Phaser.Input.Keyboard.JustUp(keyUP)||Phaser.Input.Keyboard.JustUp(keyDOWN)){ // after releasing up or down
            this.moveSpeed = 0; // reset the movespeed
            this.speedRate = 0.01; // reset the movement rate
        }
    }
    }
}