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
let newT = true

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
        console.log("Bot!!!!!!")
        listen()
    }
    else if ((gameChoice != "F") && (gameChoice != "B")) {
        console.log("Not a Valid Choice. Pick again!")
        console.log("\n")
        startGame()
    }
}

function listen() {
    if (newT === true) { newTurn() }
    else if (newT === false) { newT = true }

    if (isBotMove()) {
        handleBotMove()
    }
    else {
        console.log('Waiting for input... ')
        process.stdin.on('data', (move) => {
            handleMove(move.toString().trim())
        });
    }
}

function newTurn() {
    console.log("\n")
    console.log("Your turn " + user.toUpperCase() + "!")
    displayBoard(board)
    console.log("Enter a number! (1-9)")
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
        //console.log("This space is taken! Go again!")
        handleBotMove();
    }
    else {
        console.log("Bot Moves to space " + choice + "!!!")
        board[choice] = user.toUpperCase()
        changeUser();
        wintest()
    }
}

function handleMove(move) {
    console.log('Move was ' + move);

    if (isBotMove()) {
    } else {
        //HUMAN CODE
        handleHumanTurn(move)
    }
    wintest()
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
        console.log('I AM THE CATCH ALL!!!')
        board[move] = user.toUpperCase()
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

function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function wintest() {

    testUser("X")
    testUser("O")

    function testUser(u) {

        if (board[1] === u && board[2] === u && board[3] === u) {
            board[1] = "-"
            board[2] = "-"
            board[3] = "-"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[4] === u && board[5] === u && board[6] === u) {
            board[4] = "-"
            board[5] = "-"
            board[6] = "-"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[7] === u && board[8] === u && board[9] === u) {
            board[7] = "-"
            board[8] = "-"
            board[9] = "-"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[1] === u && board[4] === u && board[7] === u) {
            board[1] = "|"
            board[4] = "|"
            board[7] = "|"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[2] === u && board[5] === u && board[8] === u) {
            board[2] = "|"
            board[5] = "|"
            board[8] = "|"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[3] === u && board[6] === u && board[9] === u) {
            board[3] = "|"
            board[6] = "|"
            board[9] = "|"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[1] === u && board[5] === u && board[9] === u) {
            board[1] = "\\"
            board[5] = "\\"
            board[9] = "\\"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[7] === u && board[5] === u && board[3] === u) {
            board[7] = "/"
            board[5] = "/"
            board[3] = "/"
            console.log(u.toUpperCase() + " WINS!!!")
            displayBoard(board)
            process.exit()
        }
        else if (board[1] != 1 && board[2] != 2 && board[3] != 3 &&
            board[4] != 4 && board[5] != 5 && board[6] != 6 &&
            board[7] != 7 && board[8] != 8 && board[9] != 9) {
            console.log("Cat's game!")
            process.exit()
        }
    }
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

startGame();