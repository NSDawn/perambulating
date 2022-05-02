class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('menu', './assets/menu_theme.mp3');
    }

    create(){
        this.add.text(20,20, "Languorous Perambulator");
        this.add.text(20,40, "Use the arrow keys to move the slug around the obstacles.");
        this.add.text(20,60, "If you hit an obstacle, the slime bar will reduce faster.");
        this.add.text(20,80, "If the slime bar runs out, the game ends.");
        this.add.text(20,100, "Press the left arrow key to start");
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