import { getPlayerBoardInfo, getCPUBoardInfo } from "./renderGameboard";

// Add listener (attack -> refresh board)-> remove listener
export function attackOnCPU(callback, callback2, cpu, player) {
    const cellsCPU = document.querySelectorAll('#cpu-board > .cell');
    //TEMP
    const cellsCPUShips = document.querySelectorAll('#cpu-board > .cell-ship')

    function handleClick(e) {
      const cell = e.currentTarget;
      const x = parseInt(cell.dataset.row);
      const y = parseInt(cell.dataset.col);
  
      callback(x, y);
      getCPUBoardInfo(cpu);
      //check winner
      checkWinner(cpu, player)
      attackPlayer(callback2, player)

  
      cell.removeEventListener('click', handleClick);
    }
  
    cellsCPU.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    //TEMP
    cellsCPUShips.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
  }

export function attackCPU(callback) {
    const cellsCPU = document.querySelectorAll('#cpu-board > .cell');
    //TEMP
    const cellsCPUShips = document.querySelectorAll('#cpu-board > .cell-ship')

    function handleClick(e) {
      const cell = e.currentTarget;
      const x = parseInt(cell.dataset.row);
      const y = parseInt(cell.dataset.col);
    
      //TUTAJ CALLBACK MUSI BYC FUNKCJA KTORA SPRAWDZA CURRENTPLAYER I DOPIERO WYWOLUJE ATTACK
      callback(x, y);
  
      cell.removeEventListener('click', handleClick);
    }
  
    cellsCPU.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    //TEMP
    cellsCPUShips.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

export function attackPlayer(callback, player) {
    const cell = findAllowedCell('#player-board')

    cell.setAttribute('allowed', 'no')
    const x = parseInt(cell.dataset.row);
    const y = parseInt(cell.dataset.col);
    callback(x,y)
    getPlayerBoardInfo(player);
}

function findAllowedCell(boardSelector) {
    let cell;
    let attrValue;

    do {
        const [x,y] = generateRandomCoordinates();
        cell = document.querySelector(`${boardSelector} > [data-row="${x}"][data-col="${y}"]`);
        if (!cell) {
            continue;
        }
        attrValue = cell.getAttribute('allowed')
    } while (attrValue === 'no')
    
    return cell;
}


function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y]
}
  
function checkWinner(cpu, player) {
    if (player.board.allSunk() === true) {
        alert("CPU")
    } else if (cpu.board.allSunk() === true) {
        alert("PLAYER")
    }
}