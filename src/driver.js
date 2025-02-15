import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createBoard } from "./createGameboard.js"
import { getCPUBoardInfo, getPlayerBoardInfo } from "./renderGameboard.js";
import { attackPlayer, attackCPU } from "./listeners.js";
import "./style.css"


createBoard('player-board', 10);
createBoard('cpu-board', 10)

const player = Player();
const cpu = Player();

player.setIsCPU(false);
cpu.setIsCPU(true);

player.board.placeShip(0, 0, 2,'horizontal')
player.board.placeShip(8, 7, 1,'vertical')

cpu.board.placeShip(0,0,5,'horizontal')
cpu.board.placeShip(0,9,5,'vertical')

//row 0, column 2
player.board.receiveAttack(0,2);
cpu.board.receiveAttack(0,2)
//row 1, column 0
player.board.receiveAttack(1,0);
cpu.board.receiveAttack(5,5)
// row 0, column 9 
player.board.receiveAttack(0,9)

// row 0, column 2
player.board.receiveAttack(0,1);

getPlayerBoardInfo(player);
getCPUBoardInfo(cpu);

let currentPlayer = 'human';
function main() {

    //startGame()
   
    //GAME LOGIC
    attackCPU(checkTurnThenAttack)
    //human attack -> changeTurn -> cpuAttacks
}

main()



function switchTurn() {
    if (currentPlayer === 'human') {
        currentPlayer === 'cpu';
    } else {
        currentPlayer === 'human';
    }
}

// function checkTurnThenAttack(x,y) {
//     if (currentPlayer !== 'human') {
//         return;
//     }
//     let acc = parseInt(cpu.board.getMissedShots().length)
//     console.log(acc)

//     do {
//         cpu.board.receiveAttack(x,y)
//         getCPUBoardInfo(cpu)
//         console.log(cpu.board.getMissedShots().length)
//     } while (acc !== parseInt(cpu.board.getMissedShots().length))
    
//     switchTurn();

// }











