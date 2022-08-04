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
function checkWin(player) {
    const res = winCombos.some(possibilities => {
        return possibilities.every(cellI => {
            return (board[cellI] == player);
        })
    })
    return res;
}
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
	checkwiin(aiPlayer);
}
async function ai_play() {
    await new Promise(done => setTimeout(() => play(), 1000));  
}
function reset() {
    Allcells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("winner","draw","loser");
    })
}
function checkwiin(val){                                          //checks for both win and draw
    let tmp = 0;
    const res = winCombos.some(possibilities => {
        let ress = possibilities.every(cellI => {
            return (Allcells[cellI].innerText == val);
        })
        if (ress) {
            winI = tmp;
        }
        tmp++;
        return ress;
    })
    if (res == true) {
		if (val == huPlayer) {
            alert("You won!!");
        }    
        else {
            alert("You lost!!");
        }
		winCombos[winI].forEach(index => {
			if (val == huPlayer) {
				Allcells[index].classList.add("winner");	
			}
			else {
				Allcells[index].classList.add("loser");
			}
        })
    }
    else {
        const draw = Allcells.every(elems => {
            return elems.innerText != "";
        })
        if (draw == true) {
            Allcells.forEach(cell => {
                cell.classList.add("draw");
            })
            alert("Match Draw");
        }
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
		checkwiin(huPlayer);
        ai_play();
    }
}