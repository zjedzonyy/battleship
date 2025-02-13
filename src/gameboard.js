import { Ship } from "./ship";

export const Gameboard = () => {
    const createBoard = () => {
        let board = [];
        for (let i = 0; i < 10; i++) {
            board.push([]);
            for (let j = 0; j < 10; j++) {
                board[i].push(null);
            }
        }
        return board;
    }

    let board = createBoard();

    const ships = [];
    const missedShots = [];

    const placeShip = (x, y, length, orientation) => {
        const newShip = Ship(length);
        ships.push(newShip);

        for (let i = 0; i < length; i++) {
            if (orientation === "horizontal") {
                board[x+i][y] = newShip
            } else {
                board[x][y+i] = newShip
            }
        }

    }


    const receiveAttack = (x, y) => {
        // check hit
        const cell = board[x][y];
        if (!cell) {
            missedShots.push([x, y]);
            return false;
        } else {
            cell.hit();
            return true;
        }
    }

    const isSunk = (x, y) => {
        const cell = board[x][y];
        return cell.isSunk();
    }

    const allSunk = () => {

        return ships.every(ship => ship.isSunk())

    }

    const getMissedShots = () => missedShots;

    return { placeShip, receiveAttack, getMissedShots, isSunk, allSunk };
}

