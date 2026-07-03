const board = document.getElementById('board');

// Cria um elemento de texto para avisar de quem é a vez
const turnIndicator = document.createElement('h3');
turnIndicator.innerText = "Vez das Brancas (Peças Claras)";
document.body.insertBefore(turnIndicator, board);

// Matriz inicial do tabuleiro
const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

// Lista de peças brancas e pretas para validação de turno
const whitePieces = ['♙', '♖', '♘', '♗', '♕', '♔'];
const blackPieces = ['♟', '♜', '♞', '♝', '♛', '♚'];

let selectedSquare = null;
let currentTurn = 'white'; // O jogo sempre começa com as brancas

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
            
            square.innerText = initialBoard[r][c];
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
    
    // SE JÁ TIVER UMA PEÇA SELECIONADA (Tentando mover)
    if (selectedSquare) {
        const fromRow = parseInt(selectedSquare.dataset.row);
        const fromCol = parseInt(selectedSquare.dataset.col);
        
        // Se o jogador clicar na própria peça selecionada de novo, ele desmarca ela
        if (clickedSquare === selectedSquare) {
            selectedSquare.classList.remove('selected');
            selectedSquare = null;
            return;
        }

        // Move a peça na matriz lógica
        initialBoard[r][c] = initialBoard[fromRow][fromCol];
        initialBoard[fromRow][fromCol] = '';
        
        // Limpa a seleção
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
        
        // Alterna o turno
        if (currentTurn === 'white') {
            currentTurn = 'black';
            turnIndicator.innerText = "Vez das Pretas (Peças Escuras)";
        } else {
            currentTurn = 'white';
            turnIndicator.innerText = "Vez das Brancas (Peças Claras)";
        }
        
        // Redesenha o tabuleiro com a nova posição
        createBoard();
        
    } else {
        // SE NÃO TIVER SELEÇÃO (Tentando escolher uma peça)
        if (piece !== '') {
            // Verifica se a peça clicada pertence ao jogador do turno atual
            if (currentTurn === 'white' && !whitePieces.includes(piece)) {
                alert("Não é a sua vez! É a vez das peças Brancas.");
                return;
            }
            if (currentTurn === 'black' && !blackPieces.includes(piece)) {
                alert("Não é a sua vez! É a vez das peças Pretas.");
                return;
            }

            // Seleciona a peça legitimamente
            selectedSquare = clickedSquare;
            clickedSquare.classList.add('selected');
        }
    }
}

// Inicializa o jogo
createBoard();
