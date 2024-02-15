class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width, this.height)
        this.body.setCollideWorldBounds(true)
        //this.body.setImmovable(true)

        /*scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('playercube', { start: 0, end: 3, first: 0 }),
            frameRate: 12
        });

        console.log("Player created");
        */


    }

    update(){
        
        

    
    }

    jump() {

        this.body.setVelocityY(-400); // Adjust the value to control the jump height
    }

    

}


