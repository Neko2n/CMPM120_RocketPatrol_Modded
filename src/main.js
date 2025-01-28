"use strict"

/*

Name: Niko DiStefano

Implemented:
- Implement parallax scrolling for the background (3)
- Display the time remaining (in seconds) on the screen (3)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
- Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
- Implement mouse control for player movement and left mouse click to fire (5)

Bonus:
- Applied delta time so the game runs independently of your framerate
- Added respawn delays to ships
- Changed speeds of ships

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let keys = {}