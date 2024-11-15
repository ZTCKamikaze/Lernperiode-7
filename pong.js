//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
    x : 10,
    y : boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth / 2,
    y : boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;

// Maximalgeschwindigkeit des Balls
let maxSpeed = 7;
let speedIncrement = 0.1; // Erhöhe die Geschwindigkeit um 0.1 alle 30 Sekunden

let lastSpeedIncreaseTime = Date.now(); // Zeitpunkt der letzten Geschwindigkeitssteigerung

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player1
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayerStart);
    document.addEventListener("keyup", movePlayerStop);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // player1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // player2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        // if ball touches top or bottom of canvas
        ball.velocityY *= -1; //reverse direction
    }

    //bounce the ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //left side of ball touches right side of player 1 (left paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //right side of ball touches left side of player 2 (right paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // Überprüfe, ob 30 Sekunden vergangen sind, um die Ballgeschwindigkeit zu erhöhen
    let currentTime = Date.now();
    if (currentTime - lastSpeedIncreaseTime >= 30000) { // 30 Sekunden
        increaseBallSpeed();
        lastSpeedIncreaseTime = currentTime; // Update die Zeit der letzten Geschwindigkeitssteigerung
    }

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    // draw dotted line down the middle
    for (let i = 10; i < board.height; i += 25) { //i = starting y Position, draw a square every 25 pixels down
        context.fillRect(board.width / 2 - 10, i, 5, 5); 
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayerStart(e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function movePlayerStop(e) {
    //player1
    if (e.code == "KeyW" || e.code == "KeyS") {
        player1.velocityY = 0;
    }

    //player2
    if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        player2.velocityY = 0;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}

function resetGame(direction) {
    ball = {
        x : boardWidth / 2,
        y : boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}

// Funktion, um die Ballgeschwindigkeit langsam zu erhöhen
function increaseBallSpeed() {
    // Erhöhe die Geschwindigkeit, solange sie unter der Maximalgeschwindigkeit liegt
    if (Math.abs(ball.velocityX) < maxSpeed) {
        ball.velocityX += ball.velocityX > 0 ? speedIncrement : -speedIncrement; // Erhöhe oder verringere je nach Richtung
    }
    if (Math.abs(ball.velocityY) < maxSpeed) {
        ball.velocityY += ball.velocityY > 0 ? speedIncrement : -speedIncrement; // Erhöhe oder verringere je nach Richtung
    }
}

//disable spacebar scrolling
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

//disable arrow key scrolling
document.addEventListener("keydown", function(event) {
    // Check if the pressed key is an arrow key
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault(); // Prevent the default scrolling behavior
    }
});
