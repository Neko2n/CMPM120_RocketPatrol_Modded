class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('spaceship_fast', './assets/spaceship_fast.png')
        this.load.image('space', './assets/space.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('starfield_2', './assets/starfield_2.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // Animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        let menuConfig = {
            fontFamily: 'Courier',
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
        // Display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
            'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 
            'Use arrows ←→ to move and F to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        keys.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keys.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(keys.LEFT)) {
            // easy mode
            game.settings = {
                rocketSpeed: 240,     // In pixels / second
                spaceshipSpeed: 240,  // In pixels / second
                gameTime: 60000       // In miliseconds
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keys.RIGHT)) {
            // hard mode
            game.settings = {
                rocketSpeed: 240,      // In pixels / second
                spaceshipSpeed: 480,   // In pixels / second
                gameTime: 45000        // In miliseconds
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
    }
}