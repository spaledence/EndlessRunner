class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        this.score = 0; // Initialize score variable
    }

    init() {
        
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('donkey', 'imgs/endlessRunnerGuy.png')
        //this.load.image('wario', 'imgs/8bitwario.png')
        this.load.image('background', 'imgs/background.jpeg')
        this.load.image('floor', 'imgs/layer.png')
        this.load.image('halfLayer', 'imgs/halfLayer.png')
        this.load.image('coin', 'imgs/mariocoin.png')
        this.load.image('barrel', 'imgs/barrel.png')
        this.load.audio('coin', 'sounds/Pickup_coin 4.wav')
        this.load.audio('hurt', 'sounds/Hit_hurt 2.wav')
        this.load.audio('music', 'sounds/music.mp3')
        this.load.audio('speedUp', 'sounds/Powerup 2.wav')
        
        /*this.load.spritesheet('playercube', 'imgs/playercube.png', {
            frameWidth: 64,
            frameHeight: 64, 
            startFrame: 0, 
            endFrame: 3
        })
        */

        this.load.atlas('playercube', 'imgs/playercube.png', 'imgs/cube.json' )


    }

    create(){

        this.anims.create({
            key: 'playercube',
            frames: this.anims.generateFrameNames('playercube', {
                prefix: 'sprite',  // Prefix for each frame name in the atlas
                start: 0,                  
                end: 4,                   
            }),
            frameRate: 8,             
            repeat: -1                
        });

        const runAnim = this.add.sprite()

        this.score = 0
        let speedUpSoundPlayed = false;

        //this.sound.play('music')
        //this.sound.setVolume(.3)
        
        /*
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('playercube', {start: 0, end: 3, first: 0}),
            frameRate: 8
        })
        */


        this.floor = this.physics.add.sprite(0, height - height/8, 'floor').setOrigin(0)
        this.floor.setScale(.75)
        this.floor.body.setAllowGravity(false)
        this.floor.body.setImmovable(true)

        this.background = this.add.tileSprite(0, 0, 0, 0, 'background').setOrigin(0)
        this.background.setScale(.5, .6)


        
        
        //top layer and collision
        this.topBox = this.physics.add.sprite(0, height/3.5, 'halfLayer').setOrigin(0)
        this.topBox.setScale(.75)
        this.topBox.body.setAllowGravity(false)
        this.topBox.body.setImmovable(true)
        this.topLayer = this.add.tileSprite(0, height/3.5, 0, 0, 'halfLayer').setOrigin(0)
        this.topLayer.setScale(.75)

        //bot layer and collision
        this.botBox = this.physics.add.sprite(0, height - height/2.5 -10, 'halfLayer').setOrigin(0)
        this.botBox.setScale(.75)
        this.botBox.body.setAllowGravity(false)
        this.botBox.body.setImmovable(true)
        this.botLayer = this.add.tileSprite(0, height - height/2.5-10, 0, 0, 'halfLayer').setOrigin(0)
        this.botLayer.setScale(.75)

        //make player
        this.player = new Player(this, 50, 420, 'playercube').setOrigin(0).play('playercube')
        this.player.setScale(3)

        //add keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //score
        this.scoreText = this.add.text(this.game.config.width / 2, 20, 'Score: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
        this.scoreText.setOrigin(0.5, 0);

        //make donkey
        this.donkey = new Donkey(this, 800, 275, 'donkey').setOrigin(0,0)
        this.donkey.setScale(1)
        
        
        

        //player colliders
        this.physics.add.collider(this.player, this.floor)
        this.physics.add.collider(this.player, this.botBox)
        this.physics.add.collider(this.player, this.topBox)

        //donkey colliders
        this.physics.add.collider(this.donkey, this.floor)



        this.botBox.body.checkCollision.down = false
        this.topBox.body.checkCollision.down = false

        this.time.addEvent({
            delay: 1000, // 500 milliseconds (half second)
            loop: true,
            callback: this.spawnCoin,
            callbackScope: this
        });


        
    


    }

    spawnCoin() {
        // Define the spawn position of the coin

        const coinY = Phaser.Math.Between(0, 2); // 0 for up, 1 for down, 2 for stay the same

        // Apply movement based on the chosen direction
        switch (coinY) {
            case 0:
                var ySpawn = this.game.config.height/3.5 - 23
                break
            case 1:
                var ySpawn = this.game.config.height - this.game.config.height/2.5 -33
                break
            default:
                var ySpawn = this.game.config.height - this.game.config.height/8 - 23
                break
     
        }

       
        

        // Create a new coin at the spawn position
        let coin = this.physics.add.sprite(this.game.config.width, ySpawn, 'coin');
        coin.setScale(.075)



        // Set horizontal velocity to move the coin from right to left
        coin.body.setVelocityX(-200); // Adjust the velocity as needed
        coin.body.setAllowGravity(false);
        coin.outOfBoundsKill = true

        this.physics.add.overlap(this.player, coin, (player, coin) => {
            coin.destroy();
            this.sound.play('coin')
            this.score += 10; // Increase the score by 10 when player overlaps with coin
            this.scoreText.setText(`Score: ${this.score}`); // Update the score text
        });


    }   

    update(){
        
        this.background.tilePositionX +=4
        this.topLayer.tilePositionX +=2.9
        this.botLayer.tilePositionX +=2.8

        //this.player.anims.play('move', true);

        if (this.player.body.velocity.y != 0) {
            // Pause the animation
            this.player.anims.pause();
        } else {
            // Otherwise, play the animation
            this.player.anims.resume();
        }


        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.body.velocity.y == 0) {
            this.player.jump(); // Call the jump method of your player object
        }

        
        
        if(Phaser.Input.Keyboard.JustDown(this.down)){
            this.botBox.body.checkCollision.up = false
            this.topBox.body.checkCollision.up = false
            this.donkey.removeBarrelsGravity()
            this.time.delayedCall(200, () => {
                this.botBox.body.checkCollision.up = true;
                this.topBox.body.checkCollision.up = true;
                this.donkey.restoreBarrelsGravity()

            });
        }
        
        
        
        
        
        





    }


}