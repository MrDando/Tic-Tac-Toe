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
        checkGameOver()
        round += 1;
    }
    const checkGameOver = function() {
        let symbol = player;
        let board = gameboard.getBoard();
        let win = checkWin()
        if (win === true) {
            alert(`${symbol} won the round!`)
        } else if (round === 9) alert("It's a tie")

        function checkWin () {
            for (let i = 0; i <board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] != symbol) break;
                    if (board[i][j] === symbol && j === 2) return true;
                }
            }
            for (let i = 0; i <board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[j][i] != symbol) break;
                    if (board[j][i] === symbol && j === 2) return true;
                }
            }
            if(board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
            if(board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol) return true;
            return false
        }
    }
    return {init}
})();

game.init();