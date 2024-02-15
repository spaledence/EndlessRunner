class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width, this.height)
        this.body.setCollideWorldBounds(true)
        this.body.setAllowGravity(false)
        
    }

    update(){
        
    }
}