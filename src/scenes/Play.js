class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // place tile sprites
        this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.starfield_2 = this.add.tileSprite(0, 0, 640, 480, 'starfield_2').setOrigin(0, 0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        // add spaceships (x3)
        this.ships = {
            fast: new Spaceship(this, 
                game.config.width, 
                borderUISize*4,
                'spaceship_fast', 0, 50, 2, 5).setOrigin(0,0),
            one: new Spaceship(this, 
                game.config.width + borderUISize*6, 
                borderUISize*5 + borderPadding*2,
                'spaceship', 0, 30, 1.4, 2).setOrigin(0, 0),
            two: new Spaceship(this, 
                game.config.width + borderUISize*3, 
                borderUISize*6 + borderPadding*4,
                'spaceship', 0, 20, 1.2, 1).setOrigin(0,0),
            three: new Spaceship(this, 
                game.config.width + borderUISize*9, 
                borderUISize*7 + borderPadding*6, 
                'spaceship', 0, 10, 1, 0).setOrigin(0,0)
        }
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // initialize score
        this.p1Score = 0
        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig)
        this.scoreConfig.fixedWidth = 0

        // define game time
        this.gameTime = game.settings.gameTime  // In miliseconds
        // display time
        this.timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding - this.timeConfig.fixedWidth, borderUISize + borderPadding*2, Math.ceil(this.gameTime), this.timeConfig)
        this.timeConfig.fixedWidth = 0

        // GAME OVER flag
        this.gameOver = false

        keys.FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keys.RESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keys.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keys.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    endGame() {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5)
        this.gameOver = true
    }

    update(time, delta) {
        // scroll background
        this.space.tilePositionX -= 480 * (delta/1000)         // 4k pixels/second
        this.starfield.tilePositionX -= 240 * (delta/1000)     // 2k pixels/second
        this.starfield_2.tilePositionX -= 120 * (delta/1000)   // 1k pixels/second
        if (this.gameOver) {
            // check key input for restart
            if(Phaser.Input.Keyboard.JustDown(keys.RESET)) {
                this.scene.restart()
            }
            // check key input for returning to the menu
            if (Phaser.Input.Keyboard.JustDown(keys.LEFT)) {
                this.scene.start("menuScene")
            }
            return
        }
        // update player character
        this.p1Rocket.update(time, delta)
        // update spaceships
        for (const ship_id in this.ships) {
            let ship = this.ships[ship_id]
            ship.update(time, delta)
            if(this.checkCollision(this.p1Rocket, ship)) {
                this.p1Rocket.reset()
                ship.explode()
            }
        }
        // decrease timer
        this.gameTime = Math.max(0, this.gameTime - delta)
        this.timeRight.text = Math.ceil(this.gameTime/1000) // Displays time in seconds
        if (this.gameTime <= 0) {
            this.endGame()
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }
}