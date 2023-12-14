const game_starter_btn = document.getElementById('game_starter_btn');
document.getElementById('Notification_con').style.display = 'none';
var Player_1 = 0;
var Player_2 = 0;
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    const player1Input = document.getElementById('player_1');
    const player2Input = document.getElementById('player_2');
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('not_okay');

    document.addEventListener('keydown', (event) => {
        // Check if Enter key is pressed and the game_starter is visible
        if (event.key === 'Enter' && getComputedStyle(game_starter).display !== 'none') {
            // Simulate a click on the game_starter_btn
            game_starter_btn.click();
        }})

    game_starter_btn.addEventListener('click', () => {
        // Check if both input fields are filled
        if (player1Input.value.trim() !== '' && player2Input.value.trim() !== '') {
            if (player1Input.value != player2Input.value) {
                Player_1 = player1Input.value;
                Player_2 = player2Input.value;
                document.getElementById('game_starter').style.display = 'none';
            } else {
                alert('Both Player names can not be same');
            }
        } else {
            // If any input field is empty, alert the user
            alert('Please fill in both player names before starting the game.');
        }

        const Player_1_name = document.querySelector('#G_Player_1_con .G_Name_Con');
        Player_1_name.textContent = Player_1;

        const Player_2_name = document.querySelector('#G_Player_2_con .G_Name_Con');
        Player_2_name.textContent = Player_2;
    });

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    resetBtn.addEventListener('click', resetGame);
});

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('Notification_con').style.display = 'none';
    document.getElementById('game_starter').style.display = 'flex';
    renderBoard();
}

function changePlayer(active_player) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (active_player === 'O') {
        document.getElementById('G_Player_1_con').classList.add('active');
        document.getElementById('G_Player_2_con').classList.remove('active');
    } else if (active_player === 'X') {
        document.getElementById('G_Player_1_con').classList.remove('active');
        document.getElementById('G_Player_2_con').classList.add('active');
    } 
}

function cellClick(index) {
    if (!gameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        if (currentPlayer === 'X') {
            showNotification('&#127881', `${Player_1} is the winner`);
        } else if (currentPlayer === 'O') {
            showNotification('&#127881', `${Player_2} is the winner`);
        }
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        showNotification('&#128515', `It is a draw!`);
        gameActive = false;
    } else {
        changePlayer(currentPlayer);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function renderBoard() {
    boardState.forEach((value, index) => {
        const cell = board.children[index];
        cell.textContent = value;
        if (value === 'X') {
            cell.style.color = '#F54D62';
        } else if (value === 'O') {
            cell.style.color = '#87E43A';
        }
    });
}

function showNotification(Emoji, Message) {
    document.getElementById('Notification_Emoji').innerHTML = Emoji;
    document.getElementById('Notification_Message').textContent = Message;
    document.getElementById('Notification_con').style.display = 'flex';
}


