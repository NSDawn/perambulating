//statics prefab
const TIME_TO_COLLIDE = 30;

class Snakes extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,lane) {
        super(scene, x, y, texture, frame,lane);
    
    //add object to existing scene
    scene.add.existing(this);
    this.moveSpeed = 2;
    this.lane = lane;
    this.blank = true;
    this.collissions = 0;
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
        // add extra speed based on difficulty
        function speedoff() { return (Math.min(difficulty/5000, 2))};
        if (!stopped) {this.moveSpeed += speedoff()};
        // update x pos
        this.x += this.moveSpeed;

        if(this.x >= game.config.width){

            function randoff() {return (Math.floor(Math.random() * difficulty / 50))};
            this.x = - randoff();
            this.y = (this.lane * game.config.height/3) - (Math.floor(Math.random()*(game.config.height/3)));
            
            // boolean value if the static will spawn or not, based on difficulty
            function randblank() {return (1.5 - Math.random() - Math.min(0.25, (5000 - (difficulty+1000)) / 5000) < 1)}
            this.blank = randblank();
            
            if (!this.blank) {
                this.setTexture('snake');
            } else {
                this.setTexture('blank')
            }
            this.collissions = 0;
                //if all the statics are just different frames on 1 file we can make them random each time they reset here.
        }
    }
    colcounter(){
        if(this.collissions<TIME_TO_COLLIDE){
            this.collissions+=1;
            return false;
        } else {
            return true;
        }
    }
}