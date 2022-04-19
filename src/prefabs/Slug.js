//slug prefab
class Slug extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add slug to existing scene
        scene.add.existing(this);
    }
}