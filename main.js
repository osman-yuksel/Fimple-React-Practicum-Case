//Declarations of game variables.
class GameVariables {
    constructor(){
        this.player = 'X';
        this.board = ["","","","","","","","",""];
        this.winConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        this.endGameFlag = false;
        this.turnNumber = 0;
        this.gameText = document.querySelector(".game-text");
        this.playBoxes = document.querySelectorAll(".play-box");
        this.restartButton = document.getElementById("restart-button");
    }
}

//Creating event listeners for game table.
function InputManager(){
    Game.playBoxes.forEach((element) => {
        element.addEventListener("click", (box) => {
            EventHandler(box, "PLAY");
        })
    })

    Game.restartButton.addEventListener("click", (button) => {
        EventHandler(button, "RESTART");
    });
}

//Initiations of variables.
let Game = new GameVariables();
InputManager();


//Event Handler for the game.
function EventHandler(inputElement, eventType){
    if(eventType == "PLAY" && !Game.endGameFlag){
        GameManager(inputElement);
    }
    if(eventType == "RESTART")
        RestartGame();
}

//Updates the board after a event.
function UpdateBoard(displayElement, restartFlag){
    if(restartFlag){
        Game.playBoxes.forEach((element) => {
            element.innerHTML = "";
            Game.gameText.innerHTML = "X's turn";
        })
    }
    else{
        displayElement.target.innerHTML = Game.player;
        Game.gameText.innerHTML = Game.player == 'X' ?  "O's turn" : "X's turn";
    }
}

//Checks for if there is a winner.
function WinnerCheck(){
    let check = false
    Game.winConditions.forEach(element => {
        if(Game.board[element[0]] == Game.player && Game.board[element[1]] == Game.player && Game.board[element[2]] == Game.player){
            check = true;
        }
    });
    return check;
}

//Handles the game logic.
function GameManager(inputElement){
    const boxIndex = inputElement.target.dataset.index;
        
    if(Game.board[boxIndex] == ""){
        Game.board[boxIndex] = Game.player;
        UpdateBoard(inputElement, false);
            
        if(WinnerCheck()){
            console.log("Winner is " + Game.player);
            Game.gameText.innerHTML = "Winner is " + Game.player;
            Game.endGameFlag = true;
        }
            
        Game.player = Game.player == 'O' ? 'X' : 'O';
        Game.turnNumber += 1;
        
        if(Game.turnNumber == 9){
            Game.gameText.innerHTML = "Game is draw!";
            Game.endGameFlag = true;
        }
    }
}

//Restarts the game.
function RestartGame(){
    console.log("Restart");
    Game.player = 'X';
    Game.board = ["","","","","","","","",""];
    Game.endGameFlag = false;
    Game.turnNumber = 0;

    UpdateBoard(null, true);
}

