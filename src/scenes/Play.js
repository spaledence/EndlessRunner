// Dale Spence
// Endless Runner
// an endless runner
// Barrier prefab adapted from Travis Faas, An Introduction to HTML5 Game Development with Phaser.js (2017)


// keep me honest
'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();

// define game
let game = new Phaser.Game(config);