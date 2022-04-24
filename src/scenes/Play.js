class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load the slug and art
        this.load.image('slug', './assets/slug.png');
    }

    create(){
        this.add.text(20,20, "oh wow");
        this.playerSlug = new Slug(this, game.config.width-32
            , game.config.height/2, 'slug').setOrigin(0,-0.5); // add slug to the scene
    
        this.row1= [];
        for (let index = 0; index < 5; index++) {
            this.row1[index] = new Statics(this, 0, index*game.config.height/5 + 32, 'slug',0,index).setOrigin(0,0.5);
        }
        this.row2= [];
        for (let index = 0; index < 5; index++) {
            this.row2[index] = new Statics(this, -game.config.width/5, index*game.config.height/5 + 32, 'slug',0,index).setOrigin(0,0.5);
        }
        this.row3= [];
        for (let index = 0; index < 5; index++) {
            this.row3[index] = new Statics(this, 2*-game.config.width/5, index*game.config.height/5 + 32, 'slug',0,index).setOrigin(0,0.5);
        }
        this.row4= [];
        for (let index = 0; index < 5; index++) {
            this.row4[index] = new Statics(this, 3*-game.config.width/5, index*game.config.height/5 + 32, 'slug',0,index).setOrigin(0,0.5);
        }
        this.row5= [];
        for (let index = 0; index < 5; index++) {
            this.row5[index] = new Statics(this, 4*-game.config.width/5, index*game.config.height/5 + 32, 'slug',0,index).setOrigin(0,0.5);
        }
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); //declare keys
        keyUP   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        stopped = false; //declare stopped as false
        fast = false; //declare fast as false
    }
 
    update(){
        if(keyRIGHT.isDown){
            stopped = true; //stop if right key is pressed
        }else{
            stopped = false; //go if not pressed
        }
        if(KeyLEFT.isDown){
            fast= true; //go fast is left is pressed
        } else {
            fast = false; //don't if it's is not
        }
        this.playerSlug.update(stopped); //run slug update function
        this.row1.forEach( element => {
            element.update(stopped,fast);
        });
        this.row2.forEach( element => {
            element.update(stopped,fast);
        });
        this.row3.forEach( element => {
            element.update(stopped,fast);
        });
        this.row4.forEach( element => {
            element.update(stopped,fast);
        });
        this.row5.forEach( element => {
            element.update(stopped,fast);
        });
    }
}