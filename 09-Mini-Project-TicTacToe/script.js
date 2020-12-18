// global variables
let gameActive, currentPlayer, gameState; 

// accessing html
const statusDisplay = document.querySelector('.game--status'); // current player
const cell = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.game--restart');

// event listeners
cell.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);

// display message
const winningMessage = () => `Player ${currentPlayer} has won!`; 
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn(); // displays text saying current player's turn

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // update our internal game state to reflect the played move
    clickedCell.innerHTML = currentPlayer; // update the user interface to reflect the played move
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // check weather there are any values in our game state array that are still not populated with a player sign
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange(); // if no one won the game yet, continue by changing the current player
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; // save the clicked html element in a variable for easier further use 
    const clickedCellIndex = parseInt( // will return a string value, since we need an actual number we will parse it to an integer(number)
        clickedCell.getAttribute('data-cell-index') // to identify where that cell is in our grid
    ); 
    
        if (gameState[clickedCellIndex] !== "" || !gameActive) { // check whether the call has already been played, or if the game is paused. If either of those is true we will simply ignore the click.
            return;
        }

    handleCellPlayed(clickedCell, clickedCellIndex); // if everything if in order we will proceed with the game flow
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true; // to start or pause the game
    currentPlayer = "X"; // to know whose turn it is
    gameState = ["", "", "", "", "", "", "", "", ""]; // track played cells and validate the game state later on
    statusDisplay.innerHTML = currentPlayerTurn();
    cell.forEach(cell => cell.innerHTML = "");
}

handleRestartGame(); // onload