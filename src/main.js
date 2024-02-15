// Dale Spence
// Old Man Cube Barrel Hopper - A DonkeyKong-esque endless runner
// Approximate time Spent: 15-20 hours maybe
// Creative Tilt: For my creative tilt, I have implemented a switch statement that checks to see what random number has 
// been chosen between 0-2 and then allows for the Enemy/(Donkey Kong) to move up, move down, or remain still, in order to make the 
// barrels unpredictable. 
// I also couldnt quite figure out how to keep the barrels from falling through the layers when the player falls through the layers
// so I implemented an array that keeps track of all the live barrels and removes the gravity aspect on them all when the player moves down.
// it then restores the barrel gravity after 1/5 of a second. Now that I am typing this and thinking about it though, I may have been able to just
// turn off the collider on the bottom of the character, rather than on the entire layer and been able to negate this whole process. 


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
            debug: true,
            gravity: {
                x: 0,
                y: 400
            }
            
        }
    },
    scene: [Menu, Play, Gameover ]
}



// define game
let game = new Phaser.Game(config);
let { width, height } = game.config