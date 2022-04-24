class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load the slug and art
        this.load.image('slug', './assets/slug.png');
        this.load.image('rock1','./assets/1616rock01.png');
        this.load.image('rock2','./assets/1616rock02.png');
        this.load.image('stick1','./assets/1616sticks01.png');
        this.load.image('stick2','./assets/1616sticks02.png');
        this.load.image('stick3','./assets/1616sticks03.png');
    }

    create(){
        this.add.text(20,20, "oh wow");
        this.playerSlug = new Slug(this, game.config.width-32
            , game.config.height/2, 'slug').setOrigin(0,0.5); // add slug to the scene
        this.statlist = ['rock1','rock2','stick1','stick2','stick3'];    
        this.row1= [];
        for (let index = 0; index < 5; index++) {
            this.row1[index] = new Statics(this, 0, index*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,index).setOrigin(0.75,0.5);
        }
        this.row2= [];
        for (let index = 0; index < 5; index++) {
            this.row2[index] = new Statics(this, -game.config.width/5, index*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,index).setOrigin(0.75,0.5);
        }
        this.row3= [];
        for (let index = 0; index < 5; index++) {
            this.row3[index] = new Statics(this, 2*-game.config.width/5, index*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,index).setOrigin(0.75,0.5);
        }
        this.row4= [];
        for (let index = 0; index < 5; index++) {
            this.row4[index] = new Statics(this, 3*-game.config.width/5, index*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,index).setOrigin(0.75,0.5);
        }
        this.row5= [];
        for (let index = 0; index < 5; index++) {
            this.row5[index] = new Statics(this, 4*-game.config.width/5, index*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,index).setOrigin(0.75,0.5);
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
        for (let index = 0; index < 5; index++) {
            if(this.checkCollisionSimple(this.playerSlug,this.row1[index])){
                console.log('col with r1');
                this.scene.restart();
            }
            
        }
        for (let index = 0; index < 5; index++) {
            if(this.checkCollisionSimple(this.playerSlug,this.row2[index])){
                console.log('col with r2');
                this.scene.restart();
            }
            
        }
        for (let index = 0; index < 5; index++) {
            if(this.checkCollisionSimple(this.playerSlug,this.row3[index])){
                console.log('col with r3');
                this.scene.restart();
            }
            
        }
        for (let index = 0; index < 5; index++) {
            if(this.checkCollisionSimple(this.playerSlug,this.row4[index])){
                console.log('col with r4');
                this.scene.restart();
            }
            
        }
        for (let index = 0; index < 5; index++) {
            if(this.checkCollisionSimple(this.playerSlug,this.row5[index])){
                console.log('col with r5');
                this.scene.restart();
            }
            
        }
    }

    checkCollisionSimple(slug, thing){
        if(slug.x < thing.x + thing.width && slug.x + slug.width > thing.x && slug.y < thing.y +thing.height && slug.height +slug.y > thing.y) {

                return true;
            } else {

                return false;
            }
    }
}