let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let boardElement = document.querySelector('.board');
let statusElement = document.querySelector('.status');
isGameOver = false;

function createBoard(){
    boardElement.innerHTML = '';
    board.forEach((cell, index) =>{
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener('click', handlePlayerMove);
        boardElement.appendChild(cellElement);
    })
}

createBoard();
// aiMove();
function handlePlayerMove(event){
    const index = event.target.dataset.index;
    if (board[index] === '' && !isGameOver){
        board[index] = currentPlayer;
        createBoard();
    } if (checkWin(currentPlayer)){
        document.querySelector('.status').innerText = `${currentPlayer} has won the game`;
        isGameOver = true;
    } if (board.every(cell => cell !== '')){
        document.querySelector('.status').innerText = `It's a Draw!`;
        isGameOver = true;
    } if (currentPlayer === 'X' && !isGameOver){
        currentPlayer = 'O';
        aiMove();
    } else{
        currentPlayer ='X';
    }
}

function checkWin(i){
    const winConditions = [
        [0,1,2],[3,4,5,],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
        ];
        return winConditions.some(pattern =>
            pattern.every(index => board[index] === i)
        );
}

function aiMove(){
    const bestMove = getBestMove();
    board[bestMove] = 'O';
    setTimeout(createBoard,500);
    if (checkWin('O')){
        document.querySelector('.status').innerText = `${currentPlayer} has won the game`;
        isGameOver = true;
    }
    if (board.every(cell => cell !== '')){
        document.querySelector('.status').innerText = `It's a Draw!`;
        isGameOver = true;
    }
    currentPlayer = 'X'; 
}

function getBestMove(){
    let bestScore = -Infinity;
    let move = -1;
    board.forEach((cell, index) =>{
        if (cell === ''){
            board[index] = 'O'
            let score = miniMax(board, 0, false);     
            board[index] = '';   
            if (score > bestScore){
                bestScore = score;
                move = index;
                console.log(bestScore);
            }
        }
    });
    return move;
}

function miniMax(board, depth, isMaximize){
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (board.every(cell => cell !== '')) return 0;

    if (isMaximize){
        let bestScore = -Infinity;
        board.forEach((cell,index)=>{
            if (cell === ''){
                board[index] = 'O';
                bestScore = Math.max(bestScore ,miniMax(board, depth + 1, false));
                board[index] = '';
            }
        });
        return bestScore;
    }
    if (!isMaximize){
        let bestScore = Infinity;
        board.forEach((cell,index)=>{
            if (cell ===''){
                board[index] = 'X';
                bestScore = Math.min(bestScore ,miniMax(board, depth + 1, true));
                board[index] = '';
            }
        });
        return bestScore;
    }
}

function reset(){
    document.querySelector('.status').innerText = '';
    board = ['','','','','','','','',''];
    currentPlayer = 'X';
    isGameOver = false;
    createBoard();
    // aiMove();
}