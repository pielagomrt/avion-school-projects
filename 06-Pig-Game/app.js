/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


// global variables
let globalScore, roundScore, currentPlayer, playGame, gameThreshold;

// initialize game record
newGame();

// executing functions
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);


/* --------------------- TAKING TURNS ---------------------*/
function nextPlayer() {
    if (currentPlayer === 0) { // if Player 1(0) is active Player, nextPlayer would be Player 2(1)
        currentPlayer = 1;
        roundScore = 0; // removing this would pass the accumulated score to the next player
    } else {
        currentPlayer = 0; // if Player 2(1) is the active Player, nextPlayer would be Player 1(0)
        roundScore = 0; 
    }

	document.querySelector('#current-0').textContent = '0'; // reset current score for the next player's turn
	document.querySelector('#current-1').textContent = '0'; // reset current score for the next player's turn

	document.querySelector('.player-0-panel').classList.toggle('active'); // toggling 'active' (adding if absent; removing if present)
	document.querySelector('.player-1-panel').classList.toggle('active'); // toggling 'active' (adding if absent; removing if present)
}
/* --------------------- End of TAKING TURNS ---------------------*/


/* --------------------- NEW GAME BUTTON ---------------------*/
function newGame () { // clear all records

    globalScore= [0,0]; // global score
    roundScore = 0; // current score
	currentPlayer = 0; // Player 1
    playGame = true; // game will start


    // entered value will be threshold
    document.querySelector('#submit').addEventListener('click', function () {
        gameThreshold = document.querySelector('#threshold').value;
    });

    // need to set since html shows a non-zero number
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
    
    // to remove 'winner' text for the new game
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    // no dice displayed initially
    document.querySelector('.dice').style.display = 'none';
    
    // reset related line in function holdScore
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // highlight on Player 1 by default
    document.querySelector('.player-0-panel').classList.add('active');

    // no threshold value upon refresh
    document.querySelector('#threshold').value = "";
}
/* --------------------- End of NEW GAME BUTTON ---------------------*/


/* --------------------- ROLL DICE BUTTON ---------------------*/
function rollDice () {
	if(playGame) {

        let dice = Math.floor(Math.random() * 6) + 1; // +1 so as not to generate 0   

		let diceNumber = document.querySelector('.dice'); // assigning a variable for class="dice"
            diceNumber.style.display = 'block'; // adjusting css
            diceNumber.src = `dice-${dice}.png`; // linking the picture to be used

        if(dice === 1) { // if the player rolls a 1, all his ROUND score gets lost and switch to next player
            nextPlayer();
            document.querySelector('.dice').style.display = 'none'; // dice-1 will not be displayed
        } else {
            roundScore += dice; // score accumulation per dice rolling
            document.querySelector(`#current-${currentPlayer}`).textContent = roundScore; // shows accumulated current score
        }
	}
};
/* --------------------- End of ROLL DICE BUTTON ---------------------*/

/* --------------------- HOLD BUTTON ---------------------*/
function holdScore () { 
	if(playGame) {
        globalScore[currentPlayer] += roundScore; // score accumulation per hold 
		document.querySelector(`#score-${currentPlayer}`).textContent = globalScore[currentPlayer]; // shows accumulated global score

		if(globalScore[currentPlayer] >= gameThreshold) { // threshold score
            document.querySelector(`#name-${currentPlayer}`).textContent = 'Winner!'; // Player's name changed to 'winner'
            document.querySelector(`#current-${currentPlayer}`).textContent = 0; // current score displays 0
            // game will stop
			document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
			playGame = false;
		} else {
			nextPlayer(); // continue the game; switch to another player
		}
	}
};
/* --------------------- End of HOLD BUTTON ---------------------*/



