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
            , game.config.height/2, 'slug').setOrigin(0,-0.5);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        stopped = false;
    }

    update(){
        if(keyRIGHT.isDown){
            stopped = true;
        }else{
            stopped = false;
        }
        this.playerSlug.update(stopped);
    }
}