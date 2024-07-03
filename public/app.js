const playGrid = document.querySelector("#playgrid");
const info = document.querySelector("#info");
const btnReset = document.querySelector("#btnreset");
const btnSave = document.querySelector("#btnsave");
const gridSizeSelect = document.querySelector("#grid-size");
const btnAI = document.querySelector("#btnAI");

let inputBox = parseInt(gridSizeSelect.value);
let player = "mark_x";
let playAgainstAI = false;
let who_win = "";
info.innerHTML = "X Turn";
let history = [];
const scores = {
    "mark_o": 1,
    "mark_x": -1,
    "tie": 0
};

function createBox() {
    playGrid.innerHTML = "";
    playGrid.style.gridTemplateColumns = `repeat(${inputBox}, 1fr)`;
    for (let i = 0; i < (inputBox * inputBox); i++) {
        let div = document.createElement("div");
        div.classList.add("box");
        div.style.width = `${366 / inputBox - 10}px`;
        div.style.height = `${366 / inputBox - 10}px`;
        div.style.fontSize = `${200 / inputBox}px`; // Adjust font size dynamically
        div.addEventListener("click", clickMark);
        playGrid.append(div);
    }
    btnReset.setAttribute("disabled", true);
}

function clickMark(e){
    e.target.classList.add(player);
    e.target.removeEventListener("click",clickMark);

    addHistory(e.target, player);
    changePlayer();
    checkWin();
    // เช็คAI Turn
    if (playAgainstAI && player === "mark_o" && who_win === "") {
        aiMove();
    }
}

function changePlayer() {
    if (player === "mark_x") {
        player = "mark_o";
        info.innerHTML = "O Turn";
    } else {
        player = "mark_x";
        info.innerHTML = "X Turn";
    }
}
// For Human
function checkWin() {
    let allDiv = document.querySelectorAll(".box");
    let winPatterns = generateWinPatterns(inputBox);

    winPatterns.forEach(patt => {
        if (patt.every(index => allDiv[index].classList.contains("mark_x"))) {
            who_win = "mark_x";
        }
        if (patt.every(index => allDiv[index].classList.contains("mark_o"))) {
            who_win = "mark_o";
        }
    });

    if (who_win !== "") {
        if (who_win === "mark_x") {
            info.innerHTML = "X WIN !!!";
        } else {
            info.innerHTML = "O WIN !!!";
        }

        allDiv.forEach(d => {
            d.removeEventListener("click", clickMark);
        });

        btnReset.removeAttribute("disabled");
        btnSave.removeAttribute("disabled");
    } else {
        let allMark_x = document.querySelectorAll(".mark_x");
        let allMark_o = document.querySelectorAll(".mark_o");
    
        if (allMark_x.length + allMark_o.length === (inputBox * inputBox)) {
            info.innerHTML = "DRAW !!!";
            allDiv.forEach(d => {
                d.removeEventListener("click", clickMark);
            });
            btnReset.removeAttribute("disabled");
            btnSave.removeAttribute("disabled");
        }
    }
}
// For AI move
function aiMove() {
    let allDiv = document.querySelectorAll(".box");
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < allDiv.length; i++) {
        if (!allDiv[i].classList.contains("mark_x") && !allDiv[i].classList.contains("mark_o")) {
            allDiv[i].classList.add("mark_o");
            let score = minimax(allDiv, 0, false);
            allDiv[i].classList.remove("mark_o");
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    allDiv[move].classList.add("mark_o");
    allDiv[move].removeEventListener("click", clickMark);
    addHistory(allDiv[move], "mark_o");
    changePlayer();
    checkWin();
}
// Algorithm for AI
function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i].classList.contains("mark_x") && !board[i].classList.contains("mark_o")) {
                board[i].classList.add("mark_o");
                let score = minimax(board, depth + 1, false);
                board[i].classList.remove("mark_o");
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i].classList.contains("mark_x") && !board[i].classList.contains("mark_o")) {
                board[i].classList.add("mark_x");
                let score = minimax(board, depth + 1, true);
                board[i].classList.remove("mark_x");
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
// For AI
function checkWinner() {
    let allDiv = document.querySelectorAll(".box");
    let winPatterns = generateWinPatterns(inputBox);

    for (let patt of winPatterns) {
        if (patt.every(index => allDiv[index].classList.contains("mark_x"))) {
            return "mark_x";
        }
        if (patt.every(index => allDiv[index].classList.contains("mark_o"))) {
            return "mark_o";
        }
    }

    let openSpots = 0;
    for (let i = 0; i < allDiv.length; i++) {
        if (!allDiv[i].classList.contains("mark_x") && !allDiv[i].classList.contains("mark_o")) {
            openSpots++;
        }
    }

    if (openSpots === 0) {
        return "tie";
    }

    return null;
}

function resetGame() {
    let allDiv = document.querySelectorAll(".box")
    allDiv.forEach(d => {
        d.classList.remove("mark_x");
        d.classList.remove("mark_o");
        d.addEventListener("click", clickMark);
    });
    player = "mark_x";
    who_win = "";
    history = [];
    info.innerHTML = "X Turn";
    btnReset.setAttribute("disabled",true);
    btnSave.setAttribute("disabled",true);
}

function generateWinPatterns(size) {
    let patterns = [];

    // Rows
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        patterns.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
        let col = [];
        for (let j = 0; j < size; j++) {
            col.push(j * size + i);
        }
        patterns.push(col);
    }

    // Diagonals
    let diag1 = [];
    let diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(i * size + i);
        diag2.push(i * size + (size - i - 1));
    }
    patterns.push(diag1);
    patterns.push(diag2);

    return patterns;
}

function addHistory(element, player) {
    let index = Array.from(playGrid.children).indexOf(element);
    let position = `(${Math.floor(index / inputBox) + 1}, ${(index % inputBox) + 1})`;
    let entry = document.createElement("li");
    entry.textContent = `${player === 'mark_x' ? 'X' : 'O'} placed at ${position}`;
    history.push(entry.textContent);
    console.log("history ", history);
}

async function saveGame() {
    const result = who_win === "" ? "DRAW" : who_win.toUpperCase();
    const response = await fetch('/saveGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ moves: history, result })
    });
    const data = await response.text();
    console.log(data);
    resetGame();
}

createBox();
gridSizeSelect.addEventListener("change", (e) => {
    inputBox = parseInt(e.target.value);
    createBox();
    resetGame();
});
btnAI.addEventListener("click", () => {
    playAgainstAI = !playAgainstAI;
    btnAI.textContent = playAgainstAI ? "Play Against Human" : "Play Against AI";
    resetGame();
});
btnReset.addEventListener("click", resetGame);