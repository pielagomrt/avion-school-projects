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


/* ------------------ assigning variables for html ---------------- */
let globalScorePlayer1 = document.querySelector('#score-0');
let globalScorePlayer2 = document.querySelector('#score-1');

let roundScorePlayer1 = document.querySelector('#current-0');
let roundScorePlayer2 = document.querySelector('#current-1');

let divPlayer1 = document.querySelector('.player-0-panel');
let divPlayer2 = document.querySelector('.player-1-panel');

let textPlayer1 = document.querySelector('#name-0');
let textPlayer2 = document.querySelector('#name-1');

let dice = document.querySelector('.dice');

let threshold = document.querySelector('#threshold');
/*********************************************************************/


/* --------------------- initialize game record ------------------- */
newGame();
/*********************************************************************/


/* ----------------------- executing functions -------------------- */
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdButton);
/*********************************************************************/



/*********************************************************************/
/* -------------------------- TAKING TURNS --------------------------*/

function nextPlayer() {

    if (currentPlayer === 0) { // if Player 1('0') is active Player, nextPlayer would be Player 2('1')
        currentPlayer = 1;
        roundScore = 0; // removing this would pass the accumulated score to the next player
    } else {
        currentPlayer = 0; // if Player 2('1') is the active Player, nextPlayer would be Player 1('0')
        roundScore = 0; 
    }

    // reset current score for the next player's turn
	roundScorePlayer1.textContent = '0';
	roundScorePlayer2.textContent = '0';

    // toggling 'active' (adding if absent; removing if present)
	divPlayer1.classList.toggle('active'); 
	divPlayer2.classList.toggle('active');
}
/* ----------------------- End of TAKING TURNS ----------------------*/
/*********************************************************************/



/*********************************************************************/
/* ------------------------- NEW GAME BUTTON ------------------------*/

function newGame () { // clear all records

    globalScore= [0,0]; // global score
    roundScore = 0; // current score
    currentPlayer = 0; // Player 1
    playGame = true; // game will start

    // entered value will be threshold
    threshold.addEventListener('keypress', function () { threshold.value; });

    // html default value upon refresh
    threshold.value = threshold.defaultValue;

    // need to set since html shows a non-zero number
    globalScorePlayer1.textContent = '0';
    globalScorePlayer2.textContent = '0';
    roundScorePlayer1.textContent = '0';
    
    // to remove 'winner' text for the new game
    textPlayer1.textContent = 'Player 1';
    textPlayer2.textContent = 'Player 2';
    
    // no dice displayed initially
    dice.style.display = 'none';
    
    // reset related line in function holdButton
    divPlayer1.classList.remove('active');
    divPlayer2.classList.remove('active');
    divPlayer1.classList.remove('winner');
    divPlayer2.classList.remove('winner');
    
    // highlight on Player 1 by default
    divPlayer1.classList.add('active');
}
/* --------------------- End of NEW GAME BUTTON ---------------------*/
/*********************************************************************/



/*********************************************************************/
/* ------------------------ ROLL DICE BUTTON ------------------------*/

function rollDice () {
    
    let currentPlayerRoundScore = document.querySelector(`#current-${currentPlayer}`);
        
    if(playGame) { 
        let diceNum = Math.floor(Math.random() * 6) + 1; // +1 so 0 will not be generated
        dice.style.display = 'block'; // adjusting css
        dice.src = `dice-${diceNum}.png`; // linking the picture to be used  

        if(diceNum === 1) { // if the player rolls a 1, all his ROUND score gets lost and switch to next player
            nextPlayer();
            dice.style.display = 'none'; // dice-1 will not be displayed
        } else {
            roundScore += diceNum; // score accumulation per dice rolling
            currentPlayerRoundScore.textContent = roundScore; // shows accumulated current score
        }
    }
};
/* -------------------- End of ROLL DICE BUTTON ---------------------*/
/*********************************************************************/



/*********************************************************************/
/* --------------------------- HOLD BUTTON --------------------------*/

function holdButton () {

    let currentPlayerGlobalScore = document.querySelector(`#score-${currentPlayer}`);
    let currentPlayerRoundScore = document.querySelector(`#current-${currentPlayer}`);
    let currentPlayerText = document.querySelector(`#name-${currentPlayer}`);
    let currentPlayerDiv = document.querySelector(`.player-${currentPlayer}-panel`);
     
    if(playGame) {
        globalScore[currentPlayer] += roundScore; // score accumulation per hold 
        currentPlayerGlobalScore.textContent = globalScore[currentPlayer]; // shows accumulated global score

	    if(globalScore[currentPlayer] >= threshold.value) { // threshold score
            currentPlayerText.textContent = 'Winner!'; // Player's name changed to 'winner'
            currentPlayerRoundScore.textContent = 0; // current score displays 0
            dice.style.display = 'none';
            
            // game will stop
            currentPlayerDiv.classList.add('winner');
            currentPlayerDiv.classList.remove('active');
            playGame = false;
		} else {
			nextPlayer(); // continue the game; switch to another player
		}
	}
};
/* ----------------------- End of HOLD BUTTON -----------------------*/
/*********************************************************************/



