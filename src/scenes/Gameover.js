class Gameover extends Phaser.Scene{
    constructor(){
        super("gameoverScene")
    }

    preload(){

        this.load.path = './assets/'
        this.load.audio('select', 'sounds/Blip_select 4.wav')

    }

    create(data){

        let score = data.score

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let menuConfig = {
            fontFamily: 'Fascinate',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let scoreText = this.add.text(game.config.width/2, game.config.height/2 - 100, 'Score: ' + score, menuConfig).setOrigin(0.5);
        



        this.add.text(game.config.width/2, game.config.height/2 - 150, 'GAMEOVER!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press R to restart').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 15, 'Press Space for Menu').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 30, 'Dodge Barrels to Survive!').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 45, 'Credits:').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 60, 'LeshyLabs - Texture Atlas, Sounds - JFXR, Music - SoundStripe, Sprites - mariouniverse.com & PISKEL').setOrigin(.5)




    }   

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.restart)){
            this.sound.play('select')
            this.scene.start("playScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.sound.play('select')
            this.scene.start("menuScene")

        }
    }

}    