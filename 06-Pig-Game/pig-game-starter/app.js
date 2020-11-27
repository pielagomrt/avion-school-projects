/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



/* ----------------------- global variables ----------------------- */ 
let globalScore, roundScore, currentPlayer, playGame;
/*********************************************************************/


/* ------------------ assigning variables for html ----------------- */
let totalScore = document.querySelectorAll('.player-score');
let totalScoreP1 = document.querySelector('#score-0');
let totalScoreP2 = document.querySelector('#score-1');

let currentScore = document.querySelectorAll('.player-current-score');
let currentScoreP1 = document.querySelector('#current-0');
let currentScoreP2 = document.querySelector('#current-1');

let textP1 = document.querySelector('#name-0');
let textP2 = document.querySelector('#name-1');

let divP1 = document.querySelector('.player-0-panel');
let divP2 = document.querySelector('.player-1-panel');

let dice = document.querySelector('.dice');

let threshold = document.querySelector('#threshold'); // The input event fires when the value of an <input> element has been changed.
/*********************************************************************/


/*-------------------- determining current player ---------------------*/

// changing text content depending on the current player
function playerTextContent (player1, player2, value) {
    if (currentPlayer === 0) {
        player1.textContent = value;
    } else {
        player2.textContent = value;
    }
}

//changing CSS depending on the current player
function inactive () {
    if (currentPlayer === 0) {
        divP1.classList.add('active'); 
        divP2.classList.remove('active');
    } else {
        divP1.classList.remove('active');
        divP2.classList.add('active'); 
    }
}

// adding CSS to winning player
function winnerCSS (player1, player2) {
    if (currentPlayer === 0) {
        player1.classList.add('winner');
        player1.classList.remove('active');
    } else {
        player2.classList.add('winner');
        player2.classList.remove('active');
    }
}

// next player's turn
function nextPlayer () {
    if (currentPlayer === 0) { // if Player 1('0') is active Player, nextPlayer would be Player 2('1')
        currentPlayer = 1;
    } else {
        currentPlayer = 0; // if Player 2('1') is the active Player, nextPlayer would be Player 1('0')
    }
    
    inactive(); // next player should be currently inactive(CSS)
    // reset current scores for both players before the next player's turn (not doing so would pass the accumulated score of previous player to the next player)
    roundScore = 0 
	for (let i of currentScore) {
        i.textContent = 0;
    }
}
/*********************************************************************/



/* ----------------------- executing functions -------------------- */
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdButton);
document.querySelector('.btn-new').addEventListener('click', reload);
/*********************************************************************/


/*********************************************************************/
/* ------------------------ ROLL DICE BUTTON ------------------------*/
function rollDice () {
        
    if(playGame) { 
        let diceNum = Math.floor(Math.random() * 6) + 1; // +1 so 0 will not be generated
        dice.style.display = 'block'; // adjusting css
        dice.src = `dice-${diceNum}.png`; // linking the picture to be used  

        if(diceNum === 1) { // if the player rolls a 1, all his ROUND score gets lost and switch to next player
            nextPlayer();
            dice.style.display = 'none'; // dice-1 will not be displayed
        } else {
            roundScore += diceNum; // score accumulation per dice rolling
            playerTextContent(currentScoreP1, currentScoreP2, roundScore); // displays accumulated current score
        }
    }
};
/* -------------------- End of ROLL DICE BUTTON ---------------------*/
/*********************************************************************/



/*********************************************************************/
/* --------------------------- HOLD BUTTON --------------------------*/
function holdButton () {
     
    if(playGame) {
        globalScore[currentPlayer] += roundScore; // score accumulation per hold 
        playerTextContent(totalScoreP1, totalScoreP2,globalScore[currentPlayer]); // shows accumulated global score

	    if(globalScore[currentPlayer] >= threshold.value) { // threshold score
                playerTextContent(textP1, textP2, 'Winner!'); // Player's name changed to 'winner'
                playerTextContent(currentScoreP1, currentScoreP2, 0); // current score displays 0
                winnerCSS(divP1, divP2); // apply CSS
                dice.style.display = 'none';
                playGame = false; // game will stop
	    } else {
                nextPlayer(); // continue the game; switch to another player
	    }
    }

};
/* ----------------------- End of HOLD BUTTON -----------------------*/
/*********************************************************************/



/*********************************************************************/
/* ------------------------------- RESET ----------------------------*/
function reload () { 
    location.reload(); 
    return false; // reloads the page using the browser’s cached data (if true, reloads the page from the server and does not store the data cached by the browser)
};
/* --------------------------- End of RESET -------------------------*/
/*********************************************************************/


/*********************************************************************/
/* ------------------------- NEW GAME BUTTON ------------------------*/
function newGame () { // clear all records

    globalScore = [0,0]; // total score
    roundScore = 0; // current score (if not set, first value will be NaN)
    currentPlayer = 0; // Player 1
    playGame = true; // game will start

    // need to set since html shows a non-zero number
    for (let i of totalScore) {
        i.textContent = 0;
    };

    for (let i of currentScore) {
        i.textContent = 0;
    };
   
    // no dice displayed initially
    dice.style.display = 'none';   
};

newGame(); // self-executing on page load

/* --------------------- End of NEW GAME BUTTON ---------------------*/
/*********************************************************************/
