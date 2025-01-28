// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed, wrapDelay = 0) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)    // add to existing scene
        this.points = pointValue    // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed * speed   // In pixels/second
        this.wrapDelay = wrapDelay
        this.enabled = true
        this.resetTime = 0
    }

    update(time, delta) {

        if (this.enabled) {
            // move spaceship left
            this.x -= this.moveSpeed * (delta/1000)

            // wrap from left to right edge
            if (this.x <= -this.width) {
                this.reset(this.wrapDelay)
            }
        } 
        else {
            this.x = -this.width
            // decrement reset time
            if (this.resetTime > 0) {
                this.resetTime -= (delta/1000)
            } else {
                this.resetTime = 0
                this.x = game.config.width
                this.enabled = true
            }
        }
    }

    // reset position
    reset(delay = 0) {  // delay is in seconds
        if (!this.enabled) return
        this.enabled = false
        if (delay <= 0) {
            this.x = game.config.width
            this.enabled = true
        } else {
            this.resetTime = delay
        }
    }

    // explode
    explode() {
        // temporarily hide ship
        this.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.scene.add.sprite(this.x, this.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          this.reset(this.wrapDelay)                         // reset ship position
          this.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.scene.p1Score += this.points
        this.scene.scoreLeft.text = this.scene.p1Score
        this.scene.gameTime += 2000
        // play sound
        this.scene.sound.play('sfx-explosion')
    }
}