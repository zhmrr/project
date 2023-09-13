let playAgain ='Y'; 

while (playAgain === 'Y') {

/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (board[position] === ' ') {
        board[position] = mark;
        return true; //successful move
    } else {
        return false; //occupied space
}
}


// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(`${board[1]} | ${board[2]} | ${board[3]}`);
    console.log('---------');
    console.log(`${board[4]} | ${board[5]} | ${board[6]}`);
    console.log('---------');
    console.log(`${board[7]} | ${board[8]} | ${board[9]}`);

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    const validPosition = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!validPosition.includes(position)) {
        return false; //invalid position
    }
    if (board[position] !== ' ') {
        return false; //position is occupied
    }
    return true; //valid move
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //3 in row
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // 3 in column
    [1, 5, 9], [3, 5, 7]             // 3 in diagonals
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (const combination of winCombinations) {
        if (combination.every(position => board[position] === player)) {
            return true; // player with 'mark' has won
        }
    }
    return false; //no winning combination
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(position => position !== ' ');
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position = prompt (`Player ${currentTurnPlayer}'s turn, Enter your move (1-9): `);

    while (!validateMove(position)) {
        console.log ('Invalid move. Try again.');
        position = prompt (`Player ${currentTurnPlayer}'s turn, Enter your move (1-9): `)
    }

    //Mark the board with the player's move
    markBoard(position, player);
    printBoard();
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    let position = playTurn(currentTurnPlayer);
    //check for win or tie
    if (checkWin(currentTurnPlayer)) {
        console.log(`Player ${currentTurnPlayer} wins!`);
        winnerIdentified = true;
    } else if(checkFull()) {
        console.log ('It\'s a tie! ');
        winnerIdentified = true;
    }
    if (!winnerIdentified) {
        currentTurnPlayer = (currentTurnPlayer === 'X' ? 'O' : 'X');
    }
 }


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

playAgain = prompt ('Do you want to play again? (Y/N)');
console.clear();
}

console.log('Thanks for playing!');

