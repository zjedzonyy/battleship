import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createBoard } from "./createGameboard.js"
import { getCPUBoardInfo, getPlayerBoardInfo } from "./renderGameboard.js";
import { attackPlayer, attackCPU, startGameListener } from "./listeners.js";
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

startGameListener(startGame);

function startGame() {

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
}

//DODAWANIE STATKOW 
// ROZPOCZECIE GRY
//refactor kodu
//UI




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






