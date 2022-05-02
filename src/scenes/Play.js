class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.audio('main', './assets/Play_theme_normal.mp3');
        this.load.audio('main_dist', './assets/Play_theme_distorted.mp3');

        //load the slug and art
        this.load.spritesheet('slug', './assets/ss_slug_lfp.png',{
            frameWidth: 32,
            frameHeight: 16,
            startFrame:0,
            endFrame:7
        });
        this.load.image('rock1','./assets/1616rock01.png');
        this.load.image('rock2','./assets/1616rock02.png');
        this.load.image('stick1','./assets/1616sticks01.png');
        this.load.image('stick2','./assets/1616sticks02.png');
        this.load.image('stick3','./assets/1616sticks03.png');
        this.load.image('blank','./assets/1616blank.png');
        this.load.spritesheet('snake','./assets/ss_snake_idle.png',{
            frameWidth: 32,
            frameHeight: 96,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet('snake2','./assets/ss_snake_pounce.png',{
            frameWidth: 32,
            frameHeight: 96,
            startFrame: 0,
            endFrame: 13
        });

        this.load.spritesheet('slimeBar', 'assets/slimeBar.png', { frameWidth: 192, frameHeight: 32 });
    }

    create(){
        this.frame = 0;
        this.vol = 0.0;
        
        this.statlist = ['blank']
        //this.statlist = ['rock1','rock2','stick1','stick2','stick3'];    
       this.snakes = [];
       this.statics = [];
       this.fillRows();
       this.fillERows();

       this.cols = [];
       this.col1 = [];
       this.col2 = [];
       this.col3 = [];
       this.col4 = [];
       this.col5 = [];
       this.cols.push(this.col1,this.col2,this.col3,this.col4,this.col5);
        
       for (let index = 0; index < this.cols.length; index++) {
           this.statics.forEach(element => {
               this.cols[index].push(element[Math.floor(Math.random()*element.length)]);

           });
           this.emptyRows();
           this.fillRows();
           this.cols[index].forEach(element => {
               element.x = index*-game.config.width/5;
               element.texture = this.statlist[Math.floor(Math.random()*5)];
           });

        
       }

       this.enemcols = [];
       this.enemcol1 = [];
       this.enemcol2 = [];
       this.enemcol3 = [];
       this.enemcols.push(this.enemcol1,this.enemcol2,this.enemcol3);
        
       for (let index = 0; index < this.enemcols.length; index++) {
           this.snakes.forEach(element => {
               this.enemcols[index].push(element[Math.floor(Math.random()*element.length)]);

           });
           this.emptyERows();
           this.fillERows();
           this.enemcols[index].forEach(element => {
               element.x = index*-game.config.width/3-32;
               element.texture = this.statlist[Math.floor(Math.random()*3)];
           });

        
       }


       this.playtheme = this.sound.add('main',{loop:true});
        this.playtheme_dist = this.sound.add('main_dist',{volume: 0.0,loop:true,});
        this.playtheme.play();
        this.playtheme_dist.play();


        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); //declare keys
        keyUP   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        stopped = false; //declare stopped as false
        fast = false; //declare fast as false
        slime = MAX_SLIME; 
        colliding = false;
        this.anyColliding = false;

         // add slug to the scene
         this.playerSlug = new Slug(this, game.config.width-64
            , game.config.height/2, 'slug', 0).setOrigin(0.3,0.5);

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('slug', {start: 0, end: 7, first:0}),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('snake', {start: 0, end: 6, first:0}),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('snake2', {start: 0, end: 13, first:0}),
            frameRate: 16,
            repeat: 0
        });
        
        this.playerSlug.play('move'); 

        // SLIME BAR STUFF
        this.slimeBar = new SlimeBar(this, 192, 32, 'slimeBar', 0);
        
        // this will create 60 different animations all with the key name of the number
        for (let i = 1; i < 61; i++) {
            this.anims.create({
                key: "slimeBar_" + String(i),
                frames: this.anims.generateFrameNumbers('slimeBar', { frames: [ i - 1 ] }),
                frameRate: 16,
                repeat: 0,
            });
        }
        
        

        difficulty = 0; //declare difficulty at 0 at the beginning of the game
    
    // initialize score
    this.score = 0;

    this.updateScore()


    // display score
    let scoreConfig = {
        fontFamily: 'Impact',
        fontSize: '80px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }

    }
 
    update(){
        if(slime > 0){
        difficulty += 1;

        if(keyRIGHT.isDown){
            stopped = true; //stop if right key is pressed
            this.playerSlug.anims.stop();
        }else{
            stopped = false; //go if not pressed
        }
        if(KeyLEFT.isDown){
            fast= true; //go fast is left is pressed
            if(!this.playerSlug.anims.isPlaying)
                {
                    this.playerSlug.play({key: 'move', frameRate: 32});
                }
 
        } else {
            fast = false; //don't if it's is not
            if(!this.playerSlug.anims.isPlaying)
                {
                this.playerSlug.play('move');
                }
        }
        
        this.playerSlug.update(stopped,fast); //run slug update function
        
        this.cols.forEach(element => {
            element.forEach(elem =>{
                elem.update(stopped,fast,colliding);
            });
        });

        this.enemcols.forEach(element => {
            element.forEach(elem =>{
                elem.update(stopped,fast,colliding);
            });
        });

        this.anyColliding = false;
        this.cols.forEach(element =>{
            element.forEach(elem =>{
                if(!elem.blank && this.checkCollisionSimple(this.playerSlug,elem)){
                    this.anyColliding = true;
                }
            })
        });

        this.enemcols.forEach(element =>{
            element.forEach(elem =>{
                if(!elem.blank && !elem.anims.isPlaying)
                {
                  elem.play('idle');
                }
                if(!elem.blank && this.checkCollisionSimple(this.playerSlug,elem)){
                 if(elem.colcounter()){
                    slime = 0; 
                    elem.play('attack');
                }
            }
            });
        });

        colliding = this.anyColliding;
        if(stopped){
            this.playtheme.setRate(0.6);
            this.playtheme_dist.setRate(0.6);
        } else if(fast){
            this.playtheme.setRate(1.2);
            this.playtheme_dist.setRate(1.2);
        } else {
            this.playtheme.setRate(1.0);
            this.playtheme_dist.setRate(1.0);
        }

        if (this.vol < 1){this.vol+= (1/9000)};
        this.playtheme_dist.setVolume(this.vol);


        // ANIMATE SLIMEBAR
        this.slimeBar.play("slimeBar_" + String(60- Math.floor(slime / (MAX_SLIME / 60))));
    }
    }

    checkCollisionSimple(slug, thing){
        if(slug.x < thing.x + thing.width && slug.x + slug.width > thing.x && slug.y < thing.y +thing.height && slug.height +slug.y > thing.y) {

                return true;
            } else {

                return false;
            }
    }

    fillRows(){
        function randoff(u) { return (Math.random()) * u / 10;} 
       this.r1 = [new Statics(this, -32, 0*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,0).setOrigin(0.75,0.5)];
       this.r2 = [new Statics(this, -32, 1*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,1).setOrigin(0.75,0.5)];
       this.r3 = [new Statics(this, -32, 2*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,2).setOrigin(0.75,0.5)];
       this.r4 = [new Statics(this, -32, 3*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,3).setOrigin(0.75,0.5)];
       this.r5 = [new Statics(this, -32, 4*game.config.height/5 + 32, this.statlist[Math.floor(Math.random()*5)],0,4).setOrigin(0.75,0.5)];

       this.statics.push(this.r1,this.r2,this.r3,this.r4,this.r5);
    }
    emptyRows(){
        this.statics = [];
    }

    fillERows(){
        function randoff(u) { return (Math.random()) * u / 10;} 
       this.er1 = [new Snakes(this, -32, 0*game.config.height/3 + 48, this.statlist[Math.floor(Math.random()*5)],0,1).setOrigin(0.75,0)];
       this.er2 = [new Snakes(this, -32, 1*game.config.height/3 + 48, this.statlist[Math.floor(Math.random()*5)],0,2).setOrigin(0.75,0)];

       this.snakes.push(this.er1,this.er2);
    }
    emptyERows(){
        this.snakes = [];
    }
    updateScore(){  // score increases 50 points every 5 seconds
        setInterval(() => {
            this.score += 50;
            let divScore = document.getElementById("divScore");
            divScore.innerHTML = this.score;
        },5000)
       
    }
    
    
}
