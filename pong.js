
//board
let board;
let boardwidth = 500;
let boardheight = 500;
let context; 


//players
let playerwidth = 10;
let playerheight = 50;
let playervelocityy = 0;

let player1 = {
    x : 10,
    y : boardheight/2,
    width : playerwidth,
    height : playerheight,
    velocityy : playervelocityy
}

let player2 = {
    x : boardwidth - playerwidth - 10,
    y : boardheight/2,
    width : playerwidth,
    height : playerheight,
    velocityy : playervelocityy
}

window.unload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillsStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);

    document.addEventlistener("keyup", moveplayer);
}

function update(){
    requestAnimationFrame(update);

    plyer1.y += player1.velocityy;
    context.fillsStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    plyer2.y += player2.velocityy;
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

//disable spacebar scrolling
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};


//disable arrow key scrolling 
window.onkeydown = function(e) { 
    return !(e.keyCode == 38 || e.keyCode == 40); 
};

function moveplayer(e){
    if (e.code == "KeyW") {
        player1.velocityy = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityy = 3;
    }

    if (e.code == "ArrowUp") {
        player2.velocityy = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityy = 3;
    }
}

