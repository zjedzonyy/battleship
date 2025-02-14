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
        validatePlaceShipParams(x, y, length, orientation);

        // save informations about ships outside of this function
        const newShip = Ship(length);
        ships.push(newShip);

        // place a ship
        for (let i = 0; i < length; i++) {
            if (orientation === "horizontal") {
                board[x+i][y] = newShip
            } else {
                board[x][y+i] = newShip
            }
        }

    }

    const receiveAttack = (x, y) => {
        validateCoordinates(x,y);
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
        validateCoordinates(x,y);
        const cell = board[x][y];
        return cell.isSunk();
    }

    const allSunk = () => {
        return ships.every(ship => ship.isSunk())
    }

    const getMissedShots = () => missedShots;


    return { placeShip, receiveAttack, getMissedShots, isSunk, allSunk };
}


// VALIDATE FUNCTIONS
const validateCoordinates = (x, y) => {
    if (typeof x !== "number" || typeof y !== "number" || Number.isNaN(x) || Number.isNaN(y) || !Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
        throw new TypeError("Coordinates must be numbers");
    }

    if (x < 0 || x > 9 || y < 0 || y > 9) {
        throw new TypeError('Coordinates must be between 0 and 9');
    }
};

const validatePlaceShipParams = (x, y, length, orientation) => {
    if (typeof x !== "number" || typeof y !== "number" || typeof length !== "number" || Number.isNaN(x) || Number.isNaN(y)
        || Number.isNaN(length) || !Number.isSafeInteger(x) || !Number.isSafeInteger(y) || !Number.isSafeInteger(length)) {
        throw new TypeError("Coordinates and legth must be numbers")
    }

    if (x < 0 || x > 9 || y < 0 || y > 9) {
        throw new TypeError('Coordinates must be a numbers between 0 and 9')
    }

    if (length < 1 || length > 5) {
        throw new TypeError("Length must a number between 1 and 5")
    }

    //chceck if there is enough space for a ship on a board 
    if (orientation === 'horizontal') {
        if ((x+length) > 9) {
            throw new TypeError("Not enough space for the ship")
        }
    } else {
        if ((y+length) > 9) {
            throw new TypeError("Not enough space for the ship")
        }
    }
}