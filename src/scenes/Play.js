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
        this.Mushroom = new Statics(this, 0, game.config.height/2, 'slug').setOrigin(0,0.5);
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
        this.Mushroom.update(stopped,fast); //run statics update
    }
}