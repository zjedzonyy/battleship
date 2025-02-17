import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createBoard } from "./createGameboard.js"
import { getCPUBoardInfo, getPlayerBoardInfo } from "./renderGameboard.js";
import { attackCPU, startGameListener, changeOrientation, placeShip, randomBoardListener } from "./listeners.js";
import "./style.css"
// 1x * * * * *
// 1x * * * *
// 2x * * *
// 2x * *
// 1x *

createBoard('player-board', 10);
createBoard('cpu-board', 10)

const player = Player();
const cpu = Player();

player.setIsCPU(false);
cpu.setIsCPU(true);

getPlayerBoardInfo(player);
getCPUBoardInfo(cpu);

function main() {
    //Umożliwiwa ułożenie statków
    handlePlaceShip()
    //Układa statki u CPU
    startGameListener(startGame, populateCPUBoard);
    randomBoardListener(populatePlayerBoard)

}

main()
function populateCPUBoard() {
    if (shipsLength.length > 0) {
        return false;
    }

    let i = 0;
    do {
        randomPlaceShip()
        i++;
    } while (i <= 6);

    return true;
}

function populatePlayerBoard() {
    if (shipsLength.length > 7) {
        return false;
    }

    let i = 0;
    do {
        randomPlaceShipPlayer()
        i++;
    } while (i <= 6);

    getPlayerBoardInfo(player);
    return true;
}

const shipsLengthCPU = [5, 4, 3, 3, 2, 2, 1];

//function to place ship for cpu
function randomPlaceShip() {
    let placed = false;
    do {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const length = shipsLengthCPU[0];
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        try {
            cpu.board.placeShip(x, y, length, orientation);
            // Jeśli się udało, ustawiamy placed na true i wychodzimy z pętli
            shipsLengthCPU.shift();
            placed = true;
          } catch (err) {
            // Gdy placeShip rzuci błąd (np. brak miejsca),
            // ignorujemy i ponawiamy losowanie w kolejnej iteracji pętli
            placed = false;
          }
    } while (!placed)
}

function randomPlaceShipPlayer() {
    let placed = false;
    do {
        const [x, y] = generateRandomCoordinates()
        // const y = Math.floor(Math.random() * 10);
        const length = shipsLength[0];
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        try {
            player.board.placeShip(x, y, length, orientation);
            // Jeśli się udało, ustawiamy placed na true i wychodzimy z pętli
            shipsLength.shift();
            placed = true;
          } catch (err) {
            // Gdy placeShip rzuci błąd (np. brak miejsca),
            // ignorujemy i ponawiamy losowanie w kolejnej iteracji pętli
            placed = false;
          }
    } while (!placed)
}

async function startGame() {

    if (shipsLength.length > 0) {
        return false;
    }
    let game = gameState();
    attackCPU(handleHumanAttack)

    function handleHumanAttack(x,y) {
        if (game.getCurrentPlayer() !== 'human') {
            return;
        }
        cpu.board.receiveAttack(x,y)
        getCPUBoardInfo(cpu);
        if (cpu.board.doesHit(x,y) === false) {
            game.switchTurn()
            attackPlayer(handleCPUAttack)
        }
        checkWinner(cpu, player)
    }

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


function gameState() {
    let currentPlayer = 'human';
    const switchTurn = () => {
        if (currentPlayer === 'human') {
            currentPlayer = 'cpu';
        } else {
            currentPlayer = 'human';
        }
    }
    const canHumanAct = () => {
        return currentPlayer === 'human' ? true : false
    }

    function getCurrentPlayer() {
        return currentPlayer;
      }

    return {getCurrentPlayer, switchTurn, canHumanAct}
}

function checkWinner(cpu, player) {
    if (player.board.allSunk() === true) {
        alert("CPU")
    } else if (cpu.board.allSunk() === true) {
        alert("PLAYER")
    }
}

//1. Zmienna
let orientation = 'horizontal';
//2. Callback ja zmieniajacy
function handleOrientationChange() {
    if (orientation === 'horizontal') {
        orientation = 'v';
    } else {
        orientation = 'horizontal'
    }
    console.log(orientation)
}

//3. Dodanie eventListener wywolujacy callback
changeOrientation(handleOrientationChange)


//a) 
// player.board.placeShip(x,y, orientation)

//ShipsLength i orientation nie pobiera dynamicznie
const shipsLength = [5, 4, 3, 3, 2, 2, 1];
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
    shipsLength.shift();
}

function getShipLength() {
    return shipsLength[0];
}

function getOrientation() {
    return orientation;
}


// chyba jest problem ze random coordinates jak strzela to rzadko znajduje cos co moze strzelic
// i wpada w infinity loop - trzeba to poprawic

// usun btn albo rozpocznij gre od nowa logika

//REFACTOR KODU!!!!!!!! ZA DUZO POWTARZAJACEGO SIE KODU!
// ODDZIELIC LOGIKE!!!
//UI - mozna dodac legende





//genrate random attack
function attackPlayer(callback) {
    const [x,y] = findAllowedCell()
    callback(x,y)

}

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