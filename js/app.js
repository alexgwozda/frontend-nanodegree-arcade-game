/* Declare starting game-wide variables in Game
**************************************************
* -- tile width and height, useful for step intervals
* -- boundary size, increase number of rows every 10 levels, increase number of columns +2 every 20 levels
* -- player start location, relative to x and y boundary
* -- level number
* -- number of enemies 
* -- enemy subclasses enabled, add new enemy subclass every 8 levels
* -- character 
* -- start screen true/false, includes Start at highest level this browser (same character), Start at last level completed this browser (same character),  
* -- pause screen true/false, includes: Restart Game, Restart Level, Difficulty, Sound 
*/

var Game = function() {
    this.tileWidth = 101;
    this.tileHeight = 83;
    this.numCols = 5;
    this.numRows = 6;
    this.xMin = 0;
    this.xMax = this.numCols * this.tileWidth;
    this.yMin = 0;
    this.yMax = this.numRows * this.tileHeight;

    /* Assign these to global canvas at level load */
    this.setCanvasWidth =  this.xMax;
    this.setCanvasHeight = this.yMax + 25;

    /* Engine draws rows according to this*/
    this.w = 'images/water-block.png';
    this.s = 'images/stone-block.png';
    this.g = 'images/grass-block.png';
    this.rowMap = [this.w, this.s, this.s, this.s, this.g, this.g];

    this.centerX = (this.numCols - 1) / 2 * this.tileWidth;
    this.lastY = this.yMax - this.tileHeight - 13;
    this.randomCol = randomInt(0, this.numCols - 1);

    this.level = 1;
    this.numEnemies = 4;
    this.enemySubclasses = 0;
    this.character = 'boy';
    this.startScreen = true;
    this.pauseScreen = false;
}

var game = new Game;

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
    var tileX = randomInt(0, game.numCols, xInterval) * game.tileWidth;
    var tileY = randomInt(1, game.numRows - 2, yInterval) * game.tileHeight;
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
    // TODO: incorporate dt
  this.x = this.x + (20 * this.speed * dt);
  if (this.x > game.xMax) {
    this.x = -game.tileWidth;
    this.y = randomInt(1, game.numRows-1)*game.tileHeight - 25; // Enemy can respawn at starting row of player!  Forces player to get moving.  
    this.speed = randomInt(3,10);
  }
};
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function(dx, dy) {
  if (dx !== undefined && dy !== undefined) {
    this.x = this.x + dx;
    this.y = this.y + dy;
    this.dx = 0;
    this.dy = 0;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(input) {
  // variables recording changes in x or y

  if (input === 'left') {
    this.x -= game.tileWidth;
  }
  else if (input === 'up') {
    this.y -= game.tileHeight;
  }
  else if (input === 'right') {
    this.x += game.tileWidth;
  }
  else if (input === 'down') {
    this.y += game.tileHeight;
  }
}


/* Instantiate objects
**************************************************
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < game.numEnemies; i++) {
    allEnemies.push(new Enemy(-game.tileWidth, randomInt(1, 4)*game.tileHeight- 25, randomInt(3,10)));
}

/* TODO: Reset enemies every level */

var player = new Player(game.centerX, game.lastY);
//var player = new Player((game.numCols-1)/2 * game.tileWidth, (game.numRows-1)*game.tileHeight);


/* REFERENCES
**************************************************
* https://github.com/bahalps/frontend-nanodegree-arcade-game/blob/gh-pages/js/app.js
* -- studied for ideas in organizing code, understanding how to update, special enemies
* http://skru.pythonanywhere.com/udacity/game
* -- studied for ideas in subclassing, level generation, sounds
* http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
* -- more keycodes
*/