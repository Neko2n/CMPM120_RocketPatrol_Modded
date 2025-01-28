// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
    
        scene.add.existing(this)  // add to existing, displayList, updateList
        this.isFiring = false     // track rocket's firing status
        this.moveSpeed = game.settings.rocketSpeed     // In pixels/second

        this.sfxShot = scene.sound.add('sfx-shot')
      
        // bind mouse input
        this.scene.input.on('pointermove', pointer => {
            if (!this.isFiring && !this.scene.gameOver) this.x = pointer.x
        }, this)
        this.scene.input.on('pointerdown', () => {
            if (!this.isFiring && !this.scene.gameOver) this.fire()
        }, this)
    }

    fire() {
        this.isFiring = true
        this.sfxShot.play()
    }

    update(time, delta) {
        // left/right movement
        if(!this.isFiring) {
            if(keys.LEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed * (delta/1000)
            } else if(keys.RIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed * (delta/1000)
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keys.FIRE) && !this.isFiring) {
            this.fire()
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed * (delta/1000)
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset()
            this.scene.gameTime = Math.max(0, this.scene.gameTime - 4000)
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
  }