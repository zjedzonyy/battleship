import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createBoard } from "./createGameboard.js"
import { getCPUBoardInfo, getPlayerBoardInfo } from "./renderGameboard.js";
import { attackCPU, startGameListener, changeOrientation, placeShip, randomBoardListener } from "./listeners.js";
import { generateShipsToPlace } from "./placeShips.js";
import "./style.css"

const player = Player();
const cpu = Player();

player.setIsCPU(false);
cpu.setIsCPU(true);

getPlayerBoardInfo(player);
getCPUBoardInfo(cpu);

const cpuFleetConfig = generateShipsToPlace();
const playerFleetConfig = generateShipsToPlace();

let orientation = 'horizontal';

function main() {
    handleBoardsRendering()
    
    // Allows Player to generate its fleet
    handlePlaceShip()
    changeOrientation(handleOrientationChange)

    //Generates CPU's fleet and runs game
    startGameListener(startGame, generateFleetForCPU);
    randomBoardListener(generateFleetForPlayer)

}

main()

function startGame() {
    // 1. Ensure that the player has placed all of its ships
    if (playerFleetConfig.length > 0) {
        return false;
    }

    // 2. Initialize game state (manages currentPlayer and turn switching)
    let game = gameState();

    // 3. Set up CPU's board event listeners for the human attack
    attackCPU(handleHumanAttack)

    // 3.1 Callback for handling human's attack
    function handleHumanAttack(x,y) {
        if (game.getCurrentPlayer() !== 'human') {
            return;
        }
        cpu.board.receiveAttack(x,y)
        getCPUBoardInfo(cpu);
        if (cpu.board.doesHit(x,y) === false) {
            // If the human attack misses, switch turn and let CPU attack
            game.switchTurn()
            attackPlayer(handleCPUAttack)
        }
        checkWinner(cpu, player)
    }

    // 3.2 Callback for handling CPU's attack
    function handleCPUAttack(x,y) {
        if (game.getCurrentPlayer() !== 'cpu') {
            return;
        }

        player.board.receiveAttack(x,y)
        getPlayerBoardInfo(player);
        if (player.board.doesHit(x,y) === false) {
            game.switchTurn()
        }
        checkWinner(cpu, player)
        attackPlayer(handleCPUAttack)
    }

    return true;
}


// Genrate random attack
function attackPlayer(callback) {
    const [x,y] = findAllowedCell()
    callback(x,y)
}


// Returns random valid coordinates to make a shot
function findAllowedCell() {
    let illegalShots = player.board.getMissedShots();
    let illegalShots2 = player.board.getAccurateShots();
    let cell;
    do {
      const [x, y] = generateRandomCoordinates();
      cell = [x, y];
    } while (
      illegalShots.some(shot => shot[0] === cell[0] && shot[1] === cell[1]) ||
      illegalShots2.some(shot => shot[0] === cell[0] && shot[1] === cell[1])
    );
    
    
    return cell;
}


function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y]
}

function handleBoardsRendering() {
    createBoard('player-board', 10);
    createBoard('cpu-board', 10)
}


// Trying to place a ship correctly on a board till success
function randomShipPlacement(gamester, fleetConfig) {
    let placed = false;
    
    do {
        const [x, y] = generateRandomCoordinates();
        const length = fleetConfig[0];
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        try {
            gamester.board.placeShip(x, y, length, orientation);
            fleetConfig.shift();
            placed = true;
        } catch (err) {
            placed = false
        }
    } while (!placed)
}


function generateFleetForCPU() {
    // Prevent from starting the game before Player generate its fleet.
    if (playerFleetConfig.length > 0) {
        return false;
    }

    let i = 0;
    do {
        randomShipPlacement(cpu, cpuFleetConfig)
        i++;
    } while (i <= 6);

    return true;
}


function generateFleetForPlayer() {
    // Stop if Player already put something on the board
    if (playerFleetConfig.length < 7) {
        return false;
    }

    let i = 0;
    do {
        randomShipPlacement(player, playerFleetConfig)
        i++;
    } while (i <= 6);

    getPlayerBoardInfo(player);
    return true;
}


function gameState() {
    let currentPlayer = 'human';
    
    const switchTurn = () => {
        if (currentPlayer === 'human') {
            currentPlayer = 'cpu';
        } else {
            currentPlayer = 'human';
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
      }

    return {getCurrentPlayer, switchTurn}
}


function checkWinner(cpu, player) {
    if (player.board.allSunk() === true) {
        alert("CPU")
    } else if (cpu.board.allSunk() === true) {
        alert("PLAYER")
    }
}


// Handles placing ship manually
function handlePlaceShip() {
    placeShip(tryPlaceShip, getShipLength, getOrientation)
}


function tryPlaceShip(x, y, length, orientation) {
    try {
        player.board.placeShip(x,y,length,orientation)
        removeShip()
        getPlayerBoardInfo(player)
        return true;
    } catch(err) {
        return false;
    } 
}


function removeShip() {
    playerFleetConfig.shift();
}

function getShipLength() {
    return playerFleetConfig[0];
}

function getOrientation() {
    return orientation;
}

function handleOrientationChange() {
    if (orientation === 'horizontal') {
        orientation = 'v';
    } else {
        orientation = 'horizontal'
    }
}