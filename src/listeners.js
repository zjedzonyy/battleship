import { getPlayerBoardInfo, getCPUBoardInfo } from "./renderGameboard";

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

export function attackPlayer(callback) {
    const cell = findAllowedCell('#player-board')

    cell.setAttribute('allowed', 'no')
    const x = parseInt(cell.dataset.row);
    const y = parseInt(cell.dataset.col);
    callback(x,y)

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
  

export function startGameListener(callback, callback2) {
    const start = document.getElementById('start-btn')

    function handleClick(e) {
        const btn = e.currentTarget

        const ok1 = callback();
        if (!ok1) {
            return;
        }

        const ok2 = callback2();
        if (!ok2) {
            return;
        }
 
        //If both succeed
        btn.innerHTML = 'NEW GAME';
        btn.removeEventListener('click', handleClick);
        }

    start.addEventListener('click', handleClick);

}
function test(as, eve) {
    as.innerHTML = 'NEW GAME'
    as.removeEventListener('click', eve)
}

// listener na planszy do przekazania x,y i ustawienia statku
export function placeShip(callback, callback2, callback3) {
    const cells = document.querySelectorAll('#player-board > .cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            //call 1 - pobierz length
            const length = callback2();
            if (!length) {
                return;
            }

            const x = parseInt(cell.getAttribute('data-row'));
            const y = parseInt(cell.getAttribute('data-col'));

            //call 2 - pobierz orientation
            const orientation = callback3();
            callback(x,y,length,orientation)

        })
    })
}

//listener do zmiany orientacji dla placeShip w UI
export function changeOrientation(callback) {
    const btn = document.getElementById('orientation');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        callback();
        if (btn.innerHTML === 'HORIZONTAL') {
            btn.innerHTML = "VERTICAL";
        } else {
            btn.innerHTML = 'HORIZONTAL';
        }
    })
}