// create a gameboard in HTML
// board as a grid with dataset (row, col)
export function createBoard(boardId, size) {
    const board = document.getElementById(boardId);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.setAttribute('allowed', 'yes')
            board.appendChild(cell);
        }
    }
}

