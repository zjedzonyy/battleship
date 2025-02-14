import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createBoard } from "./createGameboard.js"

import "./style.css"


createBoard('player-board', 10);
createBoard('cpu-board', 10)

const player = Player();
const cpu = Player();

player.setIsCPU(false);
cpu.setIsCPU(true);

player.board.placeShip(0, 0, 2,'horizontal')
player.board.placeShip(8, 7, 1,'vertical')

//row 0, column 2
player.board.receiveAttack(0,2);

//row 1, column 0
player.board.receiveAttack(1,0);

// row 0, column 9 
player.board.receiveAttack(0,9)

// row 0, column 2
player.board.receiveAttack(0,1);

let playerBoard = player.board.getBoard();
let playerAccurateShots = player.board.getAccurateShots();
let playerMissedShots = player.board.getMissedShots();

// display ships
for (let i = 0; i <=9; i++) {
    for (let j = 0; j <=9; j++) {
        const cell = document.querySelector(`#player-board > [data-row="${i}"][data-col="${j}"]`);
        if (playerBoard[i][j] !== null) {
            cell.className = 'cell-ship';
        } 
    }
}

// display missed shots
playerMissedShots.forEach(([x,y]) => {
    const cell = document.querySelector(`#player-board > [data-row="${x}"][data-col="${y}"]`);
    cell.className = 'cell-missed-hit';
})

//display accurate shots
playerAccurateShots.forEach(([x,y]) => {
    const cell = document.querySelector(`#player-board > [data-row="${x}"][data-col="${y}"]`);
    cell.className = 'cell-accurate-hit'
})

//check accurate shots
// accurateShots.forEach(([x,y]) => {
//     const cell = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
//     cell.className = 'cell-accurate-hit';
// })


