/*--------------------------GLOBAL VARIABLES----------------------------------*/
let playGame, gameWon, currentPlayer, gameTracker;
const X = "❌";
const O = "⭕";
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*----------------------------------------------------------------------------*/

/*----------------------------ACCESSING HTML----------------------------------*/
let gameStatus = document.querySelector('.game-status');
let box = document.querySelectorAll('.box');
let restartBtn = document.querySelector('#restart');
/*----------------------------------------------------------------------------*/

/*----------------------------EVENT LISTENERS---------------------------------*/
box.forEach(box => box.addEventListener('click', clickedCellEvent));
restartBtn.addEventListener('click', newGame);
/*----------------------------------------------------------------------------*/

/*----------------------------DISPLAY MESSAGE---------------------------------*/
const winningText = () => `PLAYER ${currentPlayer} IS THE WINNER!`; 
const drawText = () => `IT'S A DRAW!`;
const activePlayer = () => `Player ${currentPlayer}' s turn`;
/*----------------------------------------------------------------------------*/

/*----------------------------REUSABLE FUNCTIONS------------------------------*/
function clickedCellDisplay(box, index) {
    gameTracker[index] = currentPlayer; // update the tracker based on player's move
    box.textContent = currentPlayer; // update UI to display the played move
}

function clickedCellEvent(clickedBox) {
    const box = clickedBox.target; // to be used for clickedCellDisplay function
    const index = parseInt(box.getAttribute('index'));
        
        if (gameTracker[index] !== "" || playGame === false) { // check whether the cell is already filled or the game is already finished
            return;
        }

    clickedCellDisplay(box, index); // calling function
    checkResults(); // calling function
}
/*----------------------------------------------------------------------------*/


// game restart
function newGame() {
    playGame = true; // to start or end the game
    gameWon = false;
    currentPlayer = X; // default player
    gameTracker = ["", "", "", "", "", "", "", "", ""]; // track played cells and validate the game state later on
    gameStatus.textContent = activePlayer();
    box.forEach(box => box.textContent = "");
}

newGame(); // onload

// identify next player
function nextPlayer() {
    if (currentPlayer === X) {
        currentPlayer = O;
    } else {
        currentPlayer = X;
    }
    gameStatus.textContent = activePlayer();
}

// determining results
function checkResults() {
    for (let thisCombo of winningPatterns) {
        let first = gameTracker[thisCombo[0]]; // index within an index of winningPatterns
        let second = gameTracker[thisCombo[1]];
        let third = gameTracker[thisCombo[2]];
        if (first === '' || second === '' || third === '') { // if there are still blank cells, continue the game
            continue;
        }
        if (first === second && second === third) { // one of the winningPatterns fulfilled
            gameWon = true;
        }
      }

    // display winner and stop game
    if (gameWon) {
        gameStatus.textContent = winningText();
        playGame = false;
        return;
    }

    // no winner and every cell is filled
    let gameDraw = !gameTracker.includes("");
    if (gameDraw) {
        gameStatus.textContent = drawText();
        playGame = false;
        return;
    }

    nextPlayer(); // if no one won the game yet, continue by changing the current player
}



