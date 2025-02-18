// Allows Player to choose a cell from CPU's grid to make a shot then removes this listener
export function attackCPU(callback) {
    const cellsCPU = document.querySelectorAll('#cpu-board > .cell');
    //TEMP
    const cellsCPUShips = document.querySelectorAll('#cpu-board > .cell-ship')

    function handleClick(e) {
      const cell = e.currentTarget;
      const x = parseInt(cell.dataset.row);
      const y = parseInt(cell.dataset.col);
    
      // Make a shot   
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
 
// Launches the game runner after ensuring that all conditions have been met.
export function startGameListener(callback, callback2) {
    const start = document.getElementById('start-btn')

    function handleClick(e) {
        const btn = e.currentTarget

        // Runs game
        const ok1 = callback();
        if (!ok1) {
            return;
        }

        // Generate CPU's fleet
        const ok2 = callback2();
        if (!ok2) {
            return;
        }
 
        // If both succeed
        btn.innerHTML = 'NEW GAME';
        btn.removeEventListener('click', handleClick);
        }

    start.addEventListener('click', handleClick);

}


// Listener on Player's cells to place ships
// listener na planszy do przekazania x,y i ustawienia statku
export function placeShip(callback, callback2, callback3) {
    const cells = document.querySelectorAll('#player-board > .cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            // Returns length of ship to place and ensures there is a ship to place
            const length = callback2();

            if (!length) {
                return;
            }

            // Get coordinates
            const x = parseInt(cell.getAttribute('data-row'));
            const y = parseInt(cell.getAttribute('data-col'));

            // Returns orientation of a ship to place
            const orientation = callback3();

            // Places ship
            callback(x,y,length,orientation)
        })
    })
}

// Listener to change placing ship's orientation
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

// Listener for random Player's fleet placement
export function randomBoardListener(callback) {
    const btn = document.getElementById('random-generate');

    function handleClick(e) {
        const btn = e.currentTarget;

        callback();

        btn.removeEventListener('click', handleClick);
    }
    
    btn.addEventListener('click', handleClick);
}
