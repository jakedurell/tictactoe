let board = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
}

let user = 'x'
let winner = null
let botNum = 0
let gameChoice;
let newT = true     // New Turn
let winType = ""    //horizontal, vertical, backslash, forward


function startGame() {
    console.log("Welcome to Tic Tac Toe!")
    console.log("Do you want to play with your friend or yourself?")
    console.log("Enter 'F' for friend & 'B' for the bot")
    process.stdin.once('data', (chunk) => {
        configureGame(chunk)
    })
}

function configureGame(input) {
    gameChoice = input.toString().trim().toUpperCase()
    if (gameChoice === "F") {
        console.log("Friend!!!")
        listen()
    }
    else if (gameChoice === "B") {
        console.log("Bot!!!")
        listen()
    }
    else if ((gameChoice != "F") && (gameChoice != "B")) {
        console.log("Not a Valid Choice. Pick again!")
        console.log("\n")
        startGame()
    }
}

function listen() {
    process.stdin.removeAllListeners('data')
    if (newT === true) { newTurn() }
    else if (newT === false) { newT = true }

    if (isBotMove()) {
        console.log("Hmmmm...")
        setTimeout(() => {
            console.log("Thinking")
            setTimeout(() => {
                console.log("Processing")
                setTimeout(() => {
                    handleBotMove()
                }, 2000)
            }, 2000)
        }, 2000)


    }
    else {
        console.log('Waiting for input... ')
        process.stdin.on('data', (move) => {
            handleHumanTurn(move.toString().trim())
        });
    }
}

function thinkingProcessing() {
    console.log("Thinking")
    console.log("Processing")
}

function newTurn() {
    console.log("\n")
    console.log("Your turn " + user.toUpperCase() + "!")
    displayBoard(board)
    //console.log("Enter a number! (1-9)")
    console.log(getMovesLeft(board) + " are the moves left...")
}

function isBotMove() {
    if (user === "o" && gameChoice === "B") {
        return true
    }
}

function placeTaken(move) {
    return (board[move] === "X" || board[move] === "O")
}

function handleBotMove() {

    choice = Math.floor(Math.random() * 9 + 1)
    //console.log(botNum)

    if (placeTaken(choice)) {
        handleBotMove();
    }
    else {
        console.log("Bot Moves to space " + choice + "!!!")
        board[choice] = user.toUpperCase()
        if (getMovesLeft(board).length < 5) { wintest(user) }
        changeUser();
        listen()
    }
}



function handleMove(move) {
    //console.log('Move was ' + move);

    if (isBotMove()) {
    } else {
        //HUMAN CODE
        handleHumanTurn(move)
    }
    //if (getMovesLeft(board).length < 5) { wintest(user) }
    //newTurn();
}

function handleHumanTurn(move) {
    if (!(move.match(/[1-9]/))) {
        console.log("Invalid Input!")
        console.log(user + " let's try this again!")
        newT = false
        listen();
    }


    else if (board[move] === "X" || board[move] === "O") {
        console.log("This space is taken! Go again!")
        newT = false
        listen();
    }
    else {
        //console.log('I AM THE CATCH ALL!!!')
        board[move] = user.toUpperCase()
        //console.log("I AM in handleHumanTurn()" + getMovesLeft(board).length + " moves left")
        if (getMovesLeft(board).length < 5) { wintest(user) }
        changeUser();
        listen();
    }
}

function displayBoard(board) {
    console.log(" " + board[1] + " | " + board[2] + " | " + board[3])
    console.log("--- --- ---")
    console.log(" " + board[4] + " | " + board[5] + " | " + board[6])
    console.log("--- --- ---")
    console.log(" " + board[7] + " | " + board[8] + " | " + board[9])
}

function changeUser() {
    // FIXME
    //console.log('User is: ' + user);
    if (user === null || user === undefined) {
        user = "x"
    } else if (user === "x") {
        user = 'o'
    } else {
        user = "x"
    }
    // FIXME
    //console.log('User is NOW: ' + user);
    return user
}

function getMovesLeft(board) {
    let regex = /[1-9]/
    let array = []
    let i = 0
    let space = null
    for (let moves in board) {
        space = board[moves].toString()
        if (space.match(regex)) {
            array[i] = board[moves].toString()
            i = i + 1
        }
    }
    return array
}



function wintest(user) {

    let winChar  // What character to change numbers to
    let winNums = getWinState(user)
    //console.log(winNums)
    if (winNums.length != 0) {
        if (winType === "horizontal") { winChar = "-" }
        if (winType === "vertical") { winChar = "|" }
        if (winType === "backslash") { winChar = "\\" }
        if (winType === "forwardslash") { winChar = "/" }

        for (let w = 0; w < 3; w++) {
            //console.log(board[winNums[w]])
            board[winNums[w]] = winChar

        }

        console.log("\n" + user.toUpperCase() + " WINS!!!")
        displayBoard(board)
        console.log("\n")
        process.exit()
    }

}


function getWinState(u) {

    let winArray = []
    u = u.toUpperCase()
    // console.log(u + " is the user. The board is: ")
    // console.log(board)


    if (board[1] === u && board[2] === u && board[3] === u) {
        winArray[0] = 1
        winArray[1] = 2
        winArray[2] = 3
        winType = "horizontal"
    }
    else if (board[4] === u && board[5] === u && board[6] === u) {
        winArray[0] = 4
        winArray[1] = 5
        winArray[2] = 6
        winType = "horizontal"
    }
    else if (board[7] === u && board[8] === u && board[9] === u) {
        winArray[0] = 7
        winArray[1] = 8
        winArray[2] = 9
        winType = "horizontal"
    }
    else if (board[1] === u && board[4] === u && board[7] === u) {
        winArray[0] = 1
        winArray[1] = 4
        winArray[2] = 7
        winType = "vertical"
    }
    else if (board[2] === u && board[5] === u && board[8] === u) {
        winArray[0] = 2
        winArray[1] = 5
        winArray[2] = 8
        winType = "vertical"
    }
    else if (board[3] === u && board[6] === u && board[9] === u) {
        winArray[0] = 3
        winArray[1] = 6
        winArray[2] = 9
        winType = "vertical"
    }
    else if (board[1] === u && board[5] === u && board[9] === u) {
        winArray[0] = 1
        winArray[1] = 5
        winArray[2] = 9
        winType = "backslash"
    }
    else if (board[3] === u && board[5] === u && board[7] === u) {
        winArray[0] = 3
        winArray[1] = 5
        winArray[2] = 7
        winType = "forwardslash"
    }
    else if (board[1] != 1 && board[2] != 2 && board[3] != 3 &&
        board[4] != 4 && board[5] != 5 && board[6] != 6 &&
        board[7] != 7 && board[8] != 8 && board[9] != 9) {
        console.log("\n" + "Cat's game!!! It's a tie!!!" + "\n")
        process.exit()
    }
    return winArray
}


startGame();