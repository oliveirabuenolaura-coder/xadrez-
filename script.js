const board = document.getElementById('board');
const statusBar = document.getElementById('status-bar');

// Posição inicial padrão das peças
const defaultBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

// Copia o tabuleiro inicial para a partida atual
let currentBoard = JSON.parse(JSON.stringify(defaultBoard));

const whitePieces = ['♙', '♖', '♘', '♗', '♕', '♔'];
const blackPieces = ['♟', '♜', '♞', '♝', '♛', '♚'];

let selectedSquare = null;
let currentTurn = 'white';

function createBoard() {
    board.innerHTML = ''; 
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            if ((r + c) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            
            square.innerText = currentBoard[r][c];
            square.dataset.row = r;
            square.dataset.col = c;
            
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);
        }
    }
}

function handleSquareClick(event) {
    const clickedSquare = event.currentTarget;
    const r = parseInt(clickedSquare.dataset.row);
    const c = parseInt(clickedSquare.dataset.col);
    const piece = clickedSquare.innerText;
    
    // Atualiza o texto do turno padrão caso estivesse mostrando um erro antes
    updateStatusText();

    if (selectedSquare) {
        const fromRow = parseInt(selectedSquare.dataset.row);
        const fromCol = parseInt(selectedSquare.dataset.col);
        
        if (clickedSquare === selectedSquare) {
            selectedSquare.classList.remove('selected');
            selectedSquare = null;
            return;
        }

        // Executa o movimento
        currentBoard[r][c] = currentBoard[fromRow][fromCol];
        currentBoard[fromRow][fromCol] = '';
        
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
        
        // Passa o turno
        currentTurn = currentTurn === 'white' ? 'black' : 'white';
        updateStatusText();
        createBoard();
        
    } else {
        if (piece !== '') {
            // Validação de turno sem travar a tela com alert()
            if (currentTurn === 'white' && !whitePieces.includes(piece)) {
                showTemporaryMessage("❌ Movimento inválido! É a vez das Brancas.");
                return;
            }
            if (currentTurn === 'black' && !blackPieces.includes(piece)) {
                showTemporaryMessage("❌ Movimento inválido! É a vez das Pretas.");
                return;
            }

            selectedSquare = clickedSquare;
            clickedSquare.classList.add('selected');
        }
    }
}

function updateStatusText() {
    if (currentTurn === 'white') {
        statusBar.style.color = '#f1f2f6';
        statusBar.innerText = "Vez das Brancas (Peças Claras)";
    } else {
        statusBar.style.color = '#ffa502'; // Um toque de cor diferenciado para as pretas
        statusBar.innerText = "Vez das Pretas (Peças Escuras)";
    }
}

function showTemporaryMessage(msg) {
    statusBar.style.color = '#ff4757'; // Vermelho para erro
    statusBar.innerText = msg;
}

// Função do botão de Reiniciar
function resetGame() {
    currentBoard = JSON.parse(JSON.stringify(defaultBoard));
    currentTurn = 'white';
    selectedSquare = null;
    updateStatusText();
    createBoard();
}

// Inicializa o jogo
createBoard();
