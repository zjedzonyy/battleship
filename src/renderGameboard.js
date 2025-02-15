
export function getPlayerBoardInfo(player) {
    // display ships
    displayShips(player, "player");
    // missed and accurate
    displayShots(player, "player");
}

export function getCPUBoardInfo(cpu) {
    displayShips(cpu, "cpu");
    displayShots(cpu, "cpu");
}

function displayShips(player, boardSelector) {
    const playerBoard = player.board.getBoard();

    for (let i = 0; i <=9; i++) {
        for (let j = 0; j <=9; j++) {
            const cell = document.querySelector(`#${boardSelector}-board > [data-row="${i}"][data-col="${j}"]`);
            if (playerBoard[i][j] !== null) {
                cell.className = 'cell-ship';
            } 
        }
    }
}

function displayShots(player, boardSelector) {
    const playerAccurateShots = player.board.getAccurateShots();
    const playerMissedShots = player.board.getMissedShots();

    // display missed shots
    playerMissedShots.forEach(([x,y]) => {
        const cell = document.querySelector(`#${boardSelector}-board > [data-row="${x}"][data-col="${y}"]`);
        cell.className = 'cell-missed-hit';
    })
    
    //display accurate shots
    playerAccurateShots.forEach(([x,y]) => {
        const cell = document.querySelector(`#${boardSelector}-board > [data-row="${x}"][data-col="${y}"]`);
        cell.className = 'cell-accurate-hit'
    })
}