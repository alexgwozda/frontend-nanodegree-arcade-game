/* Declare starting game-wide variables in Game
**************************************************
* -- tile width and height, useful for step intervals
* -- boundary size, increase number of rows every 10 levels, increase number of columns +2 every 20 levels
* -- player start location, relative to x and y boundary
* -- level number
* -- number of enemies (Game.numberEnemies)
* -- enemy subclasses enabled, add new enemy subclass every 8 levels
* -- character (Game.character)
* -- start screen true/false, includes Start at highest level this browser (same character), Start at last level completed this browser (same character),  (Game.startScreen)
* -- pause screen true/false, includes: Restart Game, Restart Level, Difficulty, Sound (Game.pauseScreen)
*/

var Game = {
    tileWidth: 101,
    tileHeight: 83,
    numCols: 5,
    numRows: 7,
    xMin: 0,
    xMax: numCols * tileWidth,
    yMin: 0,
    yMax: numRows * tileHeight,
    setCanvasWidth: xMax, /* assign this to global canvas.width at each level load */
    setCanvasHeight: yMax + 25, /* assign this to global canvas.height at each level load */

    startX: (numCols - 1) / 2 * 101,
    startY: yMax - 83,

    level: 1,
    numEnemies: 3,
    enemySubclasses: 0,
    character: 'boy',
    startScreen: true,
    pauseScreen: false
}


/* Declare helper functions
**************************************************
* TODO:
* -- cookie reader (highest level w/ what character? last started level w/ what character?)
* -- cookie checker: Is this the highest level? if so, write to highest level with character.
* -- cookie writer: on every level start, write last level with character.  (In case of closing browser or dying.)
* -- start screen display
* -- pause screen display
* -- play sounds for hitting rock or wall, dying, stepping, or using power
* -- change mouse pointer within canvas for special powers for certain characters
* COMPLETED, below:
* -- random integer within a range (use for placing items, setting enemy speed multiplier, misc.)
* -- random land tile coordinate generator (use for placing items like gems or rocks)
*/

function randomInt (min, max, interval) {
    var random = 0;
    if (interval === undefined) {
        random = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    else {
        random = (Math.floor(Math.random() * (max - min + 1) / interval) * interval) + min;
    }
    return random;
}

function randomLandTile (xInterval, yInterval) {
    var tileX = randomInt(0, Game.numCols, xInterval) * 101;
    var tileY = randomInt(1, Game.numRows - 1, yInterval) * 83;
    return [tileX, tileY];
}

function displayStartScreen() {
    /* clear canvas, set HTML page with CSS, buttons, etc. to visible */
    /* Or use a bootstrap modal? */
    /* call cookie checker for highest level started and last level started */
}

function displayGameOver() {

}

function displayPauseScreen() {

}


/* Declare event listeners
**************************************************
* -- movement of player (player.handleInput)
* -- special power enabled with 'e' or 'Shift' or mouse click based on character
* -- pause with spacebar
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left', // a
        38: 'up',
        87: 'up', // w
        39: 'right',
        68: 'right', // d
        40: 'down',
        83: 'down', // s
        69: 'power', // e
        16: 'power', // shift
        32: 'spacebar'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});



/* Declare constructor functions
**************************************************
* Enemy & Enemy.prototype.update & Enemy.prototype.render
* Enemy subclasses (remember to .call(), set .prototype = Object.create(Enemy.prototype), then correct prototype.constructor property to the subclass)
* Player
* Cloud - block visibility 4 x 2 but don't collide
* Gem - slow enemies, make invincible, 
* Rock - block movement
*/


var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

/* Enemy x position increases until its leftmost pixel is off canvas.
 * Reset x position to the left of screen at a random allowed row.
 */
Enemy.prototype.update = function(dt) { 
  this.x = this.x + (3 * this.speed);
  if (this.x > Game.xMax) {
    this.x = -100;
    this.y = randomInt(1, numRows - 1) * 83;
  }
};
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



/* Instantiate objects
**************************************************
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



/* REFERENCES
**************************************************
* https://github.com/bahalps/frontend-nanodegree-arcade-game/blob/gh-pages/js/app.js
* -- studied for ideas in organizing code, understanding how to update, special enemies
* http://skru.pythonanywhere.com/udacity/game
* -- studied for ideas in subclassing, level generation, sounds
* http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
* -- more keycodes