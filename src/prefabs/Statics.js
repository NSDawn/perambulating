//statics prefab
class Statics extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,lane) {
        super(scene, x, y, texture, frame,lane);
    
    //add object to existing scene
    scene.add.existing(this);
    this.moveSpeed = 2;
    this.lane = lane;
    this.blank = true;
    this.isMush = false;
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
        // add extra speed based on difficulty
        function speedoff() { return (Math.min(difficulty/5000, 2))};
        if (!stopped) {this.moveSpeed += speedoff()};
        // update x pos
        this.x += this.moveSpeed;

        if(this.x >= game.config.width - this.width){

            function randoff() {return (Math.floor(Math.random() * difficulty / 50))};
            this.x = - randoff();
            this.y = (this.lane * game.config.height/5) + (Math.floor(Math.random()*(game.config.height/5)));
            
            // boolean value if the static will spawn or not, based on difficulty
            function randblank() {return (1.5 - Math.random() - Math.min(0.25, (5000 - (difficulty+1000)) / 5000) < 1)}
            this.blank = randblank();
            
            if (!this.blank) {
                function randmush() {return !(1.5 - Math.random() - Math.min(0.25, (5000 - (difficulty+1000)) / 5000) < 1.1)}
                this.isMush = randmush();
                if(this.isMush){
                    this.setTexture('mush');
                }
                else{
                this.setTexture(this.statlist[Math.floor(Math.random()*this.statlist.length)]);
                }
            } else {
                this.setTexture('blank');
                this.isMush = false;
            }
                //if all the statics are just different frames on 1 file we can make them random each time they reset here.
        }
    }
}
