// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.setSpeed();

    //Generate random number to determine row for the bug
    this.setRow();
};

Enemy.prototype.setRow = function() {
    //Generate random number to determine row for the bug
    const row = Math.floor(Math.random() * 3);
    switch(row) {
        case 0:
            this.y = 65;
            break;
        case 1:
            this.y = 145;
            break;
        case 2:
            this.y = 230;
            break;
    }
}

Enemy.prototype.setSpeed = function() {
    //Generate random speed between 4 and 9
    this.speed = Math.floor(Math.random() * 6) + 4;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 500) {
        this.x = this.x + this.speed;
    } else {
        //Start the bug over from the beginning
        this.x = -50;
        this.setRow();
        this.setSpeed();
    };

    //Determine if enemy and player occupy the same space
    if (((this.x + 50) >= player.x) && (this.x < (player.x + 50)) && (player.y < 250) && (this.y > player.y) && ((this.y - player.y) < 20)) {
        //collision
        player.x = 202;
        player.y = 380;
        if (score > 0) {
            score -= 1;
        };
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor () {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 380;
    }

    handleInput(key) {
        //Move the player one block based on the key pressed. Player wins if they reach the water.
        switch(key) {
            case 'up':
                if ((this.y) - 83 >= 48) {
                    this.y -= 83;
                } else {
                    //Winner - set the player back to the start
                    this.x = 202;
                    this.y = 380;
                    score += 3;
                };
                break;
            case 'down':
                if ((this.y + 83) <= 415) {
                    this.y += 83;
                };
                break;
            case 'left':
                if ((this.x - 101) >= 0) {
                    this.x -= 101;
                };
                break;
            case 'right':
                if ((this.x + 101) <= 404) {
                    this.x += 101;
                };
                break;
        }
    };

    update() {
        
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
let score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
