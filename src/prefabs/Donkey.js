class Donkey extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x , y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //this.body.setSize(this.width/2, this.height/ 2)
        this.body.setCollideWorldBounds(true)
        this.body.setAllowGravity(false)

        //set custom Player properties


        this.moveTimer = scene.time.addEvent({
            delay: 1000, // 1/3 of a second
            loop: true,
            callback: this.randomMove,
            callbackScope: this
        });

        this.barrelTimer = scene.time.addEvent({
            delay: 2000, // Interval between barrel spawns
            loop: true,
            callback: () => {
                this.spawnBarrel(this.x, this.y);
            },
            callbackScope: this
        });

        this.spawnedBarrels = [];

        
    }
    update(){
        //updateMoveTimer.call(this);
    }

    randomMove() {
        // Randomly choose a movement direction
        const moveDirection = Phaser.Math.Between(0, 2); // 0 for up, 1 for down, 2 for stay the same

        // Apply movement based on the chosen direction
            switch (moveDirection) {
                case 0:
                    this.body.velocity.y = -300; // Move up
                    this.spawnBarrel()
                    break;
                case 1:
                    this.body.velocity.y = 300; // Move down
                    this.spawnBarrel()
                    break;
                default:
                    this.body.velocity.y = 0; // Stay the same
                    break;
            }
    }

    spawnBarrel() {
        // Create a new barrel at Donkey's position
        let barrel = this.scene.physics.add.sprite(this.x, this.y, 'barrel');
        barrel.setScale(.05)
        
        this.scene.physics.add.collider(barrel, this.scene.floor);

        this.scene.physics.add.collider(barrel, this.scene.topBox);

        this.scene.physics.add.collider(barrel, this.scene.botBox);

        this.scene.physics.add.collider(barrel, this.scene.player, (barrel, player) => {
            this.scene.scene.start("gameoverScene", {score: this.scene.score})
            this.scene.sound.play('hurt')
        });
        
        
        
        if (this.scene.score > 99){
            barrel.setVelocityX(-450)
            if (!this.scene.speedUpSoundPlayed){
                this.scene.sound.play('speedUp')
                let speedUpText = this.scene.add.text(game.config.width / 2, game.config.height / 2 + 15, 'Speed Up!', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        speedUpText.destroy();  // Remove the text after 1 second
                    },
                    callbackScope: this.scene
                });
                this.scene.speedUpSoundPlayed = true
            }
        }
        else{
            barrel.setVelocityX(-300);
            this.scene.speedUpSoundPlayed = false

        }

        this.spawnedBarrels.push(barrel);

        barrel.update = () => {
            if (barrel.x < 0) {
                barrel.destroy();
                // Remove barrel from the list of spawned barrels
                this.spawnedBarrels.splice(this.spawnedBarrels.indexOf(barrel), 1);
            }
        };


        // Destroy the barrel when it exits the world bounds
        
        barrel.outOfBoundsKill = true;
    }

    removeBarrelsGravity() {
        this.spawnedBarrels.forEach(barrel => {
            barrel.body.setAllowGravity(false);
        });
    }

    restoreBarrelsGravity() {
        this.spawnedBarrels.forEach(barrel => {
            barrel.body.setAllowGravity(true);
        });
    }

    
    /*
    updateMoveTimer() {
        if (this.scene.score > 300) {
            this.moveTimer.delay = 500; //Update delay to 500 milliseconds
        } else {
            this.moveTimer.delay = 1000; //Reset delay to 1000 milliseconds
        }
    }
    */

}