const gameboard = (function () {
    let board = [["","",""],
                 ["","",""],
                 ["","",""]];

    const update = function (cell, player) {
        const i = cell.id[2]
        const j = cell.id[3]
        board[i][j] = player;
        displayDriver.markCell(i, j, board[i][j])
    };
    const getBoard = function () {
        return board
    }
    return {update, getBoard}
})();

const displayDriver = (function() {
    const markCell = function (i, j , val) {
        const cell = document.getElementById(`C-${i}${j}`)
        cell.innerText = val;
    }
    return {markCell}
})();

const game = (function () {
    let round = 1;
    let player;
    const init = function () {
        const cells = document.querySelectorAll('.cell')
        cells.forEach( (cell) => cell.addEventListener('click', validateMove))
    };
    const validateMove = function (e) {
        const cell = e.target;
        if (cell.innerText === "") {
            playRound(cell)
        }
    }
    const playRound = function(cell) {
        if (round % 2 != 0) {
            player = "X";
        } else {
            player = "O";
        };
        gameboard.update(cell, player)
        round += 1;
    }
    return {init}
})();

game.init();