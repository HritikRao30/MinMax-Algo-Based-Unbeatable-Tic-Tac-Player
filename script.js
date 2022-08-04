let scoreX = 0;
let winI = 0;
const rst = document.querySelector(".reset");
const disp = document.querySelector("#display");
const x = document.querySelector("#playerX");
const o = document.querySelector("#playerO");
let scoreO = 0;
const cells = document.querySelectorAll("td");
const Allcells = Array.from(cells);   //for using the evry ad some function
Allcells.forEach(cell => {
    cell.addEventListener('click', handleclick);
})
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const wincombs = [                   //we will checkfor wins inthese cells represented by arrays
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
reset();
function change() {
    if (val == 'X') {
        val = 'O';
    }
    else {
        val = 'X';
    }
}
function reset() {
    //disp.classList.remove("endgame");
    //disp.innerText = "";
    x.innerText = `Score X:${scoreX}`;
    o.innerText = `Score O:${scoreO}`;
    Allcells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("winner","draw");
    })
}
function checkwin(val) {
    let tmp = 0;
    const res = wincombs.some(possibilities => {
        let res =  possibilities.every(cellI => {
            return (Allcells[cellI].innerText == val);
        })
        if (res) {
            winI = tmp;
        }
        tmp++;
        return res;
    })
    if (res == true) {
        alert(`Player${val} won!!`);
        //disp.innerText = `Player${val} won!!`;*/
        wincombs[winI].forEach(index => {
            Allcells[index].classList.add("winner");
        })
        //disp.classList.add("endgame");
        if (val == "X") {
            scoreX++;
        }
        else {
            scoreO++;
        }
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
function play() {
    let newpos = [];
    len = 0;
    let tmp = 0;
    board.forEach(pos => {
        if (pos == 0) {
            newpos.push(tmp);
            len++;
        }
        tmp++;
    })
    tmp = newpos[Math.floor(Math.random() * len)]
    board[tmp] = -1;
    Allcells[tmp].innerText = "O";
    checkwin("O");
}
async function play_comp() {
    await new Promise(done => setTimeout(() => play(), 1000));  
}
function handleclick(event) {
    if (event.target.innerText == ""){
        event.target.innerText = "X";
        board[parseInt(event.target.id)] = 1;
        checkwin("X");
        play_comp();
    }
}
rst.addEventListener("click", reset);


