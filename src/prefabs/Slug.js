//const declaration
const X_MAX_VELOCITY = 0;
const X_ACC = 0;
const X_DEC = 0;
const LF_BOUND = 0;
const RT_BOUND = 0;

const Y_MAX_VELOCITY = 4;
const Y_MAX_VELOCITY_FAST = 6;
const Y_ACC = 0.1;
const Y_ACC_FAST = 0.2;
const Y_DEC = 0.075;
const Y_DEC_STOPPED = 0.6;
let UP_BOUND = 0; // reinitialized @super()
let DN_BOUND = 0; // reinitialized @super()

class v2 {
    constructor(one,two){
        this.x = one;
        this.y = two;
    }
}

//slug prefab
class Slug extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add slug to existing scene
        scene.add.existing(this); //add to existing, displayList, updateList
        this.d = new v2(0, 0); // displacement per frame
        this.maxd = new v2(X_MAX_VELOCITY, Y_MAX_VELOCITY); // max displacement per frame
        this.maxdf = new v2(X_MAX_VELOCITY, Y_MAX_VELOCITY_FAST) //max fast displacement
        this.ACC = new v2(X_ACC, Y_ACC); // acceleration per frame
        this.ACC_FAST = new v2(X_ACC, Y_ACC_FAST);
        this.DEC = new v2(X_DEC, Y_DEC);
        this.DEC_STOPPED = new v2(X_DEC, Y_DEC_STOPPED);

        UP_BOUND = this.height + 32;
        DN_BOUND = game.config.height - this.height - 32;

    }


    update(stopped, fast){
        // updating location based on displacement every frame, 
        //    making sure it does not exceed the bounds
        if (this.d.x > 0) { // x
            this.x = Math.max(this.x + this.d.x, RT_BOUND);
        } else if (this.d.x < 0) {
            this.x = Math.min(this.x + this.d.x, LF_BOUND);
        }
        if (this.d.y < 0) { // y
            this.y = Math.max(this.y + this.d.y, UP_BOUND);
        } else if (this.d.y > 0) {
            this.y = Math.min(this.y + this.d.y, DN_BOUND);
        }
        
         // (x) accelerate if keydown
        if (!keyDOWN.isDown && keyUP.isDown && !stopped) {
            this.d.y = Math.max(this.d.y - this.ACC.y, - this.maxd.y);
        } else if (!keyUP.isDown && keyDOWN.isDown && !stopped) {
            this.d.y = Math.min(this.d.y + this.ACC.y, this.maxd.y);
        } else if (!keyDOWN.isDown && keyUP.isDown && !stopped && fast ) {
            this.d.y = Math.max(this.d.y - this.ACC_FAST.y, - this.maxdf.y);
        } else if (!keyUP.isDown && keyDOWN.isDown && !stopped && fast) {
            this.d.y = Math.min(this.d.y + this.ACC_FAST.y, this.maxdf.y);
        } else if(!stopped){             // decelerate otherwise
            if (this.d.y > this.DEC.y) {
                this.d.y -= this.DEC.y
            } else if (this.d.y < -this.DEC.y) {
                this.d.y += this.DEC.y;    
            } else {
                this.d.y = 0;
            } 
        }else{
            if (this.d.y > this.DEC_STOPPED.y) {
                this.d.y -= this.DEC_STOPPED.y
            } else if (this.d.y < -this.DEC_STOPPED.y) {
                this.d.y += this.DEC_STOPPED.y;    
            } else {
                this.d.y = 0;
            } 
        }
        // (y) acceleration would go here 
    }
}