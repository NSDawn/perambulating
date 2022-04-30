class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('menu', './assets/menu_theme.mp3');
    }

    create(){
        this.add.text(20,20, "Languorous Perambulator: press left to start");
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.menutheme =  this.sound.add('menu',{loop:true});
        this.menutheme.play();
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(KeyLEFT)){
            this.menutheme.stop();
            this.scene.start('playScene');
        }
    }
}