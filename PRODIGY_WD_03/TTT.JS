const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const winHistoryList = document.getElementById('winHistoryList');
const themeSwitch = document.getElementById('theme-switch');
const themeLabel = document.getElementById('theme-label');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
let score = { X: 0, O: 0 };

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    score[currentPlayer]++;
    updateScores();
    addToHistory(currentPlayer);
  } else if (board.every(cell => cell)) {
    statusElement.textContent = "It's a tie!";
    gameActive = false;
    addToHistory('Tie');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winConditions.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

function updateScores() {
  scoreXElement.textContent = score.X;
  scoreOElement.textContent = score.O;
}

function addToHistory(result) {
  const listItem = document.createElement('li');
  listItem.textContent = result === 'Tie' ? "It's a tie!" : `Player ${result} won`;
  winHistoryList.appendChild(listItem);
}

// Theme Toggle
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  themeLabel.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// Initialize
createBoard();
