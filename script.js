let playerO = "O";
let playerX = "X";
let human = playerX;
let computer = playerO;

let humanScore = 0;
let computerScore = 0;



let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOver = false;
let restartGameButton;

window.onload = function() {
    gameCells = Array.from(this.document.getElementsByClassName("game-cell"));
    for  (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton = document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
}

function placeCell() {
    if (gameOver) return;

    const index = parseInt(this.getAttribute("data-cell-index"));

    if (gameBoard[index] !== "") return;

    gameBoard[index] = human;
    this.innerText = human;

    checkWinner();

    if (!gameOver) {
        setTimeout(computerMove, 400);
    }
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];


        if (a == b && b == c && a != "") {
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    setTimeout(() => {
                        gameCells[i].classList.add("winning-game-cell");
                    }, 50);
                }
            }
            gameOver = true;

            if (a === human) {
                humanScore++;
            } else {
                computerScore++;
            }
             
            updateScore();


            return;
        }
    }
} 

function restartGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
}


function computerMove() {
    if (gameOver) return;

    let move = findBestMove();

    gameBoard[move] = computer;
    gameCells[move].innerText = computer;

    checkWinner();
}


function updateScore() {
    document.getElementById("scoreboard").innerText =
        `You: ${humanScore} | Computer: ${computerScore} `
}



function findBestMove() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;

        let line = [gameBoard[a], gameBoard[b], gameBoard[c]];

        if (line.filter(v => v === computer).length === 2 &&
            line.includes("")) {
                return condition[line.indexOf("")];
            }
    }
    for (let condition of winningConditions) {
        let [a, b, c] = condition;

        let line = [gameBoard[a], gameBoard[b], gameBoard[c]];

        if (line.filter(v => v === human).length === 2 &&
            line.includes("")) {
                return condition[line.indexOf("")];
            }
    }

    if (gameBoard[4] === "") return 4;

    let empty = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") empty.push(i);
    }

    return empty[Math.floor(Math.random() * empty.length)];

}