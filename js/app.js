// Enemies our player must avoid
var Enemy = function(x , y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;

    //Difference between the player and the enemy (collison)
    if (Math.abs(this.x - player.x) <= 40 &&
    Math.abs(this.y - player.y) <= 40 ){
        player.x = 200;
        player.y = 300;
        counter = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 300;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var counter = 0;
Player.prototype.handleInput = function(direction) {    

    //Moving the player to the desired direction
    if (direction === 'up' && (this.y >= 0)){
        this.y -= 85;
        //If the player reaches the water, the game ends and it resets the player's position
        if (this.y < 45 ){
            this.x = 200;
            this.y = 300;
            counter++;
            alert(`You won ${counter} times in a row!`);
        } 
    }
    else if (direction === 'left' && (this.x > 0)) {
        this.x-= 100;
    }
    else if(direction == 'down' && (this.y < 385)){
        this.y+= 85;
    }
    else if(direction == 'right'  && (this.x < 400)){
        this.x+= 100;
    }

    
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];

function random(low,high)
{
	return Math.floor(Math.random()*(high-low+1))+low;
}

//Random placements for the enemies according to the random functino.
var yValues = [60, 150, 210];
allEnemies.push(new Enemy(3,60,200));
setInterval(function() {
    var y = random(0,2);
    var speed = random(200, 600);
    allEnemies.push(new Enemy(3,yValues[y],speed));
}, 1000);



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


