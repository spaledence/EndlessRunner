class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){

        this.load.path = './assets/'
        this.load.audio('music', 'sounds/music.mp3')
        this.load.audio('select', 'sounds/Blip_select 4.wav')


    }

    create(){

        if (!this.sound.get('music')) {
            this.backgroundMusic = this.sound.add('music', { loop: true });
            this.backgroundMusic.play();
            this.backgroundMusic.setVolume(.5)
        }

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


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

        this.add.text(game.config.width/2, game.config.height/2 - 150, 'Donkey Kong Endless Runner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to Jump').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 15, 'Press DOWN ARROW to Drop').setOrigin(.5)

        this.add.text(game.config.width/2, game.config.height/2 + 90, 'Collect Coins for Points').setOrigin(.5)
        this.add.text(game.config.width/2, game.config.height/2 + 105, 'Dodge Barrels to Survive!').setOrigin(.5)


    }   

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.sound.play('select')
            this.scene.start("playScene")
        }
    }
}