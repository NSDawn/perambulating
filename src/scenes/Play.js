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
        this.Mushroom1 = new Statics(this, 0, 0, 'slug',0,0).setOrigin(0,0.5);
        this.Mushroom2 = new Statics(this, 0, game.config.height/5, 'slug',0,1).setOrigin(0,0.5);
        this.Mushroom3 = new Statics(this, 0, 2*game.config.height/5, 'slug',0,2).setOrigin(0,0.5);
        this.Mushroom4 = new Statics(this, 0, 3*game.config.height/5, 'slug',0,3).setOrigin(0,0.5);
        this.Mushroom5 = new Statics(this, 0, 4*game.config.height/5, 'slug',0,4).setOrigin(0,0.5);
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
        this.Mushroom1.update(stopped,fast); //run statics update
        this.Mushroom2.update(stopped,fast); //run statics update
        this.Mushroom3.update(stopped,fast); //run statics update
        this.Mushroom4.update(stopped,fast); //run statics update
        this.Mushroom5.update(stopped,fast); //run statics update
    }
}