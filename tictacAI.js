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

let user = 'o'
let winner = null
let botNum = 0

// Maybe delete
let gameChoice = null

console.log("Welcome to Tic Tac Toe!")
console.log("Do you want to play with your friend or yourself?")


console.log("Enter 'F' for friend & 'B' for the bot")
process.stdin.once('data', (chunk) => {
    let gameChoice = chunk.toString().trim().toUpperCase()

    if (gameChoice === "F") { console.log("Friend!!!") }
    else if (gameChoice === "B") { console.log("Bot!!!!!!") }
    newTurn(user, gameChoice)
});

//let game = gameChoice

// FIXME
let timesThrough = 0;

function newTurn(user, gameChoice) {

    console.log("\n")
    process.stdin.removeAllListeners('data')
    //console.log('\033[2J');
    wintest()
    user = changeUser(user);
    console.log("Your turn " + user.toUpperCase() + "!")
    console.log("Enter a number! (1-9)")
    console.log(getMovesLeft(board) + " are the moves left...")
    displayBoard(board)
    //console.log(gameChoice)

    if (user === "o" && gameChoice === "B") {               //BOT CODE
        // FIXME
        console.log('I AM HERE!!!')

        botNum = Math.floor(Math.random() * 9 + 1)
        // getBestMove(board)

        console.log(botNum)
        if (board[botNum] === "X" || board[botNum] === "O") {
            console.log("This space is taken! Go again!")
            let notUser = "x"
            newTurn(notUser, gameChoice)
        }
        board[botNum] = user.toUpperCase()
        //displayBoard(board)
        console.log('Calling gameChoice again with:')
        console.log(`ROUND: ${timesThrough} USER: ${user}, CHOICE ${gameChoice}`)
        newTurn(user, gameChoice)
    }

    else {                                                  //HUMAN CODE
        humanEntry(user, gameChoice)
        function humanEntry(humanUser, gameChoice) {
            timesThrough += 1;
            
            console.log('Round: ' + timesThrough);
            console.log('Player is: ' + humanUser);

            console.log("Start Human Entry")
            process.stdin.once('data', (chunk) => {
                let userInput = chunk.toString().trim()

                let regex = /[1-9]/
                if (!(userInput.match(regex))) {
                    console.log("Invalid Input!")
                    console.log(humanUser + " let's try this again!")
                    //user = changeUser(humanUser);
                    humanEntry(humanUser, gameChoice)
                }


                if (board[userInput] === "X" || board[userInput] === "O") {
                    console.log("This space is taken! Go again!")
                    humanEntry(humanUser, gameChoice)

                }
                else {
                    board[userInput] = humanUser.toUpperCase()
                    newTurn(humanUser, gameChoice)
                }
            });
            
        }
    }
}

function displayBoard(board) {
    console.log(" " + board[1] + " | " + board[2] + " | " + board[3])
    console.log("--- --- ---")
    console.log(" " + board[4] + " | " + board[5] + " | " + board[6])
    console.log("--- --- ---")
    console.log(" " + board[7] + " | " + board[8] + " | " + board[9])

}

function getBestMove(board) {
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


function changeUser(user) {
    console.log('User is: ' + user);
    if (user === null) { user = "x" }
    if (user === "x") { user = 'o' }
    else { user = "x" }
    console.log('User is NOW: ' + user);
    return user
}