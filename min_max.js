var board = [0,1,2,3,4,5,6,7,8];
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
const Allcells = Array.from(cells);   //for using the evry ad some function
Allcells.forEach(cell => {
    cell.addEventListener('click', handleclick);
})

/*function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}*/

/*function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}*/

/*function checkWin(player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}*/
function checkWin(player) {
    const res = winCombos.some(possibilities => {
        return possibilities.every(cellI => {
            return (board[cellI] == player);
        })
    })
    return res;
}
/*function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
*/
function emptySquares() {
	return board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(player) {
	var availSpots = emptySquares();

	if (checkWin(huPlayer)) {
		return {score: -10};
	} else if (checkWin(aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = board[availSpots[i]];
		board[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(aiPlayer);
			move.score = result.score;
		}

		board[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
function play() {
    let nxtmove = bestSpot();
    board[nxtmove] = aiPlayer;
	Allcells[nxtmove].innerText = aiPlayer;
	checkwinn(aiPlayer);
	checkdraw();
}
async function ai_play() {
    await new Promise(done => setTimeout(() => play(), 1000));  
}
function checkwinn(val) {
    const res = winCombos.some(possibilities => {
        let res = possibilities.every(cellI => {
            return (Allcells[cellI].innerText == val);
        })
    })
    if (res == true) {
        alert(`Player${val} won!!`);
    }
}
function checkdraw() {
    const res = board.every(pos => {
        return typeof pos != 'number';
	})
	if (res) {
		alert("Draw!!");
	}
}
function handleclick(event){
    if (event.target.innerText == ""){
        event.target.innerText = huPlayer;
		board[parseInt(event.target.id)] = huPlayer;
		checkwinn(huPlayer);
		checkdraw();
        ai_play();
    }
}