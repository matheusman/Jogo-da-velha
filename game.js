const game = {
    board: ['', '', '', '', '', '', '', '', '']
}

const player1 = {
    jogar: true,
    Symbol: './assets/x.png',
    markPosition: [],
    markGameWins: 0
}

const player2 = {
    jogar: false,
    Symbol: './assets/circulo.png',
    markPosition: []
}

const gameSet = () => {
    const box = document.querySelectorAll('.box')
    box.forEach(box => box.addEventListener('click', boxMarkGame))
}

const boxMarkGame = event => {
    const box = event.target
    const gameId = game.board[box.id - 1]
    if (gameId === '') {
        if (player1.jogar) {
            game.board[box.id - 1] = player1.Symbol
            player1.markPosition.push(box.id - 1)
            box.innerHTML = `<img src="${player1.Symbol}">`
            player1.jogar = false
            gameWinStates(player1)
        } else {
            game.board[box.id - 1] = player2.Symbol
            player2.markPosition.push(box.id - 1)
            box.innerHTML = `<img src="${player2.Symbol}">`
            player1.jogar = true
            gameWinStates(player2)
        }
    } else {
        return false
    }
    gameEmpateVelha()
}

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const gameEmpateVelha = () => {
    if (player1.markPosition.length + player2.markPosition.length === 9) {
        winnerGame()
    }
}

const removeIndex = (arr, index) => {
    arr.slice(index)
}

const gameWinStates = (playerWin) => {
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    win.forEach(item => {
        if (equals(item, player1.markPosition.sort()) || equals(item, player2.markPosition.sort())) {
            winnerGame()
        }
    })
    for (let e = 0; e < playerWin.markPosition.length; e++) {
        const arr = [...playerWin.markPosition]
        arr.splice(e, 1)
        win.forEach( item => {
            if (equals(item, arr)) {
                winnerGame()
            }
        })
    }
}

const winnerGame = () => {
    const gameOver = document.getElementById('GameOver')
    gameOver.style.display = 'flex'
    document.getElementById('reset').addEventListener('click', resetGameOver)
}

const resetGameOver = () => {
    const gameOver = document.getElementById('GameOver')
    gameOver.style.display = 'none'
    document.querySelectorAll('.box').forEach(boxs => boxs.innerHTML = '')
    game.board = ['', '', '', '', '', '', '', '', '']
    player1.markPosition = []
    player2.markPosition = []
    if (player1.markGameWins === 0) {
        player1.jogar = false
        player1.markGameWins = 1
    } else if (player1.markGameWins === 1) {
        player1.jogar = true
        player1.markGameWins = 0
    }
}

gameSet()
