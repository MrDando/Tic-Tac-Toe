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
    const clearBoard = function () {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = ""
                displayDriver.markCell(i, j, board[i][j])
            }
        }
    }
    return {update, getBoard, clearBoard}
})();

const displayDriver = (function() {
    const container = document.getElementById('container')
    const init = function () {
        const cells = container.querySelectorAll('.cell');
        cells.forEach( (cell) => cell.addEventListener('click', game.validateMove));

        const restartButton = container.querySelector('#new-game-btn')
        restartButton.addEventListener('click', game.resetGame)
    }
    const markCell = function (i, j , val) {
        const cell = container.querySelector(`#C-${i}${j}`)
        cell.innerText = val;
    }
    const togglePopup = function () {
        const popup = container.querySelector('.popup')
        popup.classList.toggle("show");
    }
    const displayMessage = function (message) {
        const popup = container.querySelector('#popup-text')
        popup.innerText = message;
    }
    return {init, markCell, togglePopup, displayMessage}
})();

const game = (function () {
    let round = 1;
    let player;
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
            gameEnd("win", player)
        } else if (round === 9) gameEnd("tie", null)

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
    const gameEnd = function (type, player) {
        displayDriver.togglePopup();

        let message;
        if (type === "win") {
            message = `${player} has won!`
            
        } else {
            message = "Draw"
        }
        displayDriver.displayMessage(message)
    }
    const resetGame = function () {
        round = 1;
        gameboard.clearBoard();
        displayDriver.togglePopup();
    }
    return {validateMove, resetGame}
})();

displayDriver.init();