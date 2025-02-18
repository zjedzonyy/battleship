/**
 * Updates the UI for the player's board.
 * This function displays both ships and shot statuses on the player's board.
*/
export function getPlayerBoardInfo(player) {
    updateBoardDisplay(player, "player");
  }
  
  /**
   * Updates the UI for the CPU's board.
   *
   * @param {Object} cpu - The CPU player object.
   */
  export function getCPUBoardInfo(cpu) {
    updateShotsDisplay(cpu, "cpu");
  }
  
  /**
   * Updates the board display by showing placed ships and shots (missed/accurate).
   *
   * @param {Object} player - The player (or CPU) object.
   * @param {string} boardId - The identifier for the board ("player" or "cpu").
   */
  function updateBoardDisplay(player, boardId) {
    updateShipsDisplay(player, boardId);
    updateShotsDisplay(player, boardId);
  }

  
  /**
   * Iterates through the game board array and updates the UI for cells that contain a ship.
   *
   * @param {Object} player - The player (or CPU) object.
   * @param {string} boardId - The identifier for the board.
   */
  function updateShipsDisplay(player, boardId) {
    const board = player.board.getBoard();
  
    // Iterate through rows and columns of the board
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // Select the cell element based on data attributes and board id
        const cell = document.querySelector(`#${boardId}-board > [data-row="${i}"][data-col="${j}"]`);
        // If the cell exists and there is a ship (non-null value), update its class
        if (cell && board[i][j] !== null) {
          cell.className = 'cell-ship';
        }
      }
    }
  }
  
  /**
   * Updates the UI for shot statuses (missed and accurate) on the board.
   *
   * @param {Object} player - The player (or CPU) object.
   * @param {string} boardId - The identifier for the board.
   */
  function updateShotsDisplay(player, boardId) {
    // Update missed shots
    updateCellsClass(player.board.getMissedShots(), boardId, 'cell-missed-hit');
    // Update accurate shots
    updateCellsClass(player.board.getAccurateShots(), boardId, 'cell-accurate-hit');
  }
  
  /**
   * Helper function to update the class of cells based on an array of coordinate pairs.
   *
   * @param {Array} shots - An array of coordinate pairs ([x, y]) representing shot positions.
   * @param {string} boardId - The identifier for the board ("player" or "cpu").
   * @param {string} className - The CSS class to apply to the cells.
   */
  function updateCellsClass(shots, boardId, className) {
    shots.forEach(([x, y]) => {
      const cell = document.querySelector(`#${boardId}-board > [data-row="${x}"][data-col="${y}"]`);
      if (cell) {
        cell.className = className;
      }
    });
  }
  