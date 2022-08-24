class Player {
    constructor(value){
        this.value = value;
    }
}

let player = new Player('X');
let board = ["","","","","","","","",""];
const winConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
endGameFlag = false;

function InputManager(){
    const playBoxes = document.querySelectorAll(".play-box");
    //console.log(playBoxes);
    playBoxes.forEach((element) => {
        element.addEventListener("click", (box) => {
            EventHandler(box, "INPUT");
        })
    })
}


function EventHandler(inputElement, eventType){
    if(eventType == "INPUT" && !endGameFlag){
        const boxIndex = inputElement.target.dataset.index;
        //console.log(inputElement.target.dataset.index);
        if(board[boxIndex] == ""){
            board[boxIndex] = player.value;
            UpdateBoard(inputElement, false);
            console.log("Winner Check", WinnerCheck())
            if(WinnerCheck()){
                console.log("Winner is " + player.value);
                endGameFlag = true;
            }
            player.value = player.value == "O" ? "X" : "O";

        }
    }
}

function UpdateBoard(displayElement, restartFlag){
    //console.log(displayElement);
    if(restartFlag){

    }
    else{
        board[displayElement.target.dataset.index] = player.value;
        displayElement.target.innerHTML = player.value;
    }
}


function WinnerCheck(){
    let check = false
    winConditions.forEach(element => {
        if(board[element[0]] == player.value && board[element[1]] == player.value && board[element[2]] == player.value){
            check = true;
        }
    });
    return check;
}


function GameManager(){
    InputManager();                                      
    console.log("Initiated");
}

GameManager();