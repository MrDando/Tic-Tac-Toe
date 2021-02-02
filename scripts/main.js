const gameboard = (function () {
    let board = [["","",""],
                 ["","",""],
                 ["","",""]];

    const update = function (i, j, val) {
        board[i][j] = val;
        displayDriver.markCell(i, j, board[i][j])
    };
    return {update}
})();

const displayDriver = (function() {
    const markCell = function (i, j , val) {
        const cell = document.getElementById(`C-${i}${j}`)
        cell.innerText = val;
    }
    return {markCell}
})();

const game = (function () {
    let player = 1;
    let mark = "X";
    const init = function () {
        const cells = document.querySelectorAll('.cell')
        cells.forEach( (cell) => cell.addEventListener('click', validateMove))
    };
    const validateMove = function (e) {
        const cell = e.target;
        if (cell.innerText === "") {
            markCell(cell)
        }
    }
    const setPlayer = function() {
        if (player === 1) {
            mark = "X";
            player = 2;
        } else {
            mark = "O";
            player = 1;
        }
        return mark;
    }
    const markCell = function(cell) {
        let mark = setPlayer();
        const x = cell.id[2]
        const y = cell.id[3]
        gameboard.update(x, y, mark)

    }
    return {init}
})();

game.init();