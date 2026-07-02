const board = document.getElementById('board');

// Matriz inicial do tabuleiro (Emojis das peças)
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

let selectedSquare = null;

function createBoard() {
    board.innerHTML = ''; // Limpa o tabuleiro antes de desenhar
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Define a cor de fundo (xadrez)
            if ((r + c) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            
            // Coloca a peça na casa
            square.innerText = initialBoard[r][c];
            
            // Guarda as coordenadas da casa no próprio elemento HTML
            square.dataset.row = r;
            square.dataset.col = c;
            
            // Adiciona o evento de clique para mover as peças
            square.addEventListener('click', handleSquareClick);
            
            board.appendChild(square);
        }
    }
}

function handleSquareClick(event) {
    const clickedSquare = event.currentTarget;
    const r = parseInt(clickedSquare.dataset.row);
    const c = parseInt(clickedSquare.dataset.col);
    
    // Se já tiver uma peça selecionada
    if (selectedSquare) {
        const fromRow = parseInt(selectedSquare.dataset.row);
        const fromCol = parseInt(selectedSquare.dataset.col);
        
        // Move a peça na matriz lógica
        initialBoard[r][c] = initialBoard[fromRow][fromCol];
        initialBoard[fromRow][fromCol] = '';
        
        // Remove o destaque visual da seleção anterior
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
        
        // Redesenha o tabuleiro com a nova posição
        createBoard();
    } else {
        // Se não tiver seleção e a casa clicada tiver uma peça, seleciona ela
        if (clickedSquare.innerText !== '') {
            selectedSquare = clickedSquare;
            clickedSquare.classList.add('selected');
        }
    }
}

// Inicializa o jogo pela primeira vez
createBoard();
