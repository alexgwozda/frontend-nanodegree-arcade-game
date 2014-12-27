/* Declare game-wide variables in Game
* -- tile intervals (Constant)
* -- boundary size, increase number of rows every 10 levels
* -- player start location, relative to y boundary
* -- handleInput for pause etc. 
* -- level number
* -- number of enemies (Game.numberEnemies)
* -- enemy subclasses enabled, add new enemy subclass every 8 levels
* -- character (Game.character)
* -- start screen true/false, includes Start at highest level this browser (same character), Start at last level completed this browser (same character),  (Game.startScreen)
* -- pause screen true/false, includes: Restart Game, Restart Level, Difficulty, Sound (Game.pause)
*/

/* Declare helper functions
* -- cookie reader (highest level w/ what character? last started level w/ what character?)
* -- cookie checker: Is this the highest level? if so, write to highest level with character.
* -- cookie writer: on every level start, write last level with character.  (In case of closing browser or dying.)
* -- random integer within a range (use for placing items, setting enemy speed multiplier)
* -- start screen display
* -- pause screen display
* -- play sounds for hitting rock or wall, dying, stepping, or using power
* -- change mouse pointer within canvas for special powers for certain characters
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedMoveKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
        // add awsd, 'e' or 'ctrl' for power, spacebar for pause
    };
    player.handleInput(allowedKeys[e.keyCode]);

});


/* Declare event listeners
* -- movement of player (player.handleInput)
* -- special power enabled with 'e' or 'Shift' or mouse click based on character
* -- pause with spacebar
* -- 
*/

/* Declare constructor functions
* Enemy & Enemy.prototype.update & Enemy.prototype.render
* Enemy subclasses (remember to .call(), set .prototype = Object.create(Enemy.prototype), then correct prototype.constructor property to the subclass)
* Player
* Cloud - block visibility 4 x 2 but don't collide
* Gem - slow enemies, make invincible, 
* Rock - block movement
*/


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



/* Instantiate objects
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



/* REFERENCES
* https://github.com/bahalps/frontend-nanodegree-arcade-game/blob/gh-pages/js/app.js
* -- studied for ideas in organizing code, understanding how to update, special enemies
* http://skru.pythonanywhere.com/udacity/game
* -- studied for ideas in subclassing, level generation, sounds