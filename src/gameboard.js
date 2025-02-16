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
    const accurateShots = [];

    const placeShip = (x, y, length, orientation) => {
        validatePlaceShipParams(x, y, length, orientation);

        // save informations about ships outside of this function
        const newShip = Ship(length);
        ships.push(newShip);

        // place a ship
        for (let i = 0; i < length; i++) {
            if (orientation === "horizontal") {
                board[x][y+i] = newShip
            } else {
                board[x+i][y] = newShip
            }
        }

    }

    const receiveAttack = (x, y) => {
        validateCoordinates(x,y);
        // check hit
        const cell = board[x][y];
        if (cell === null) {
            missedShots.push([x, y]);
            return false;
        } else {
            accurateShots.push([x,y]);
            cell.hit();
            return true;
        }
    }

    const isSunk = (x, y) => {
        validateCoordinates(x,y);
        const cell = board[x][y];
        return cell.isSunk();
    }

    const doesHit = (x, y) => {
        validateCoordinates(x,y);
        const cell = board[x][y];
        if (!cell) {
            return false;
        }
        return cell.doesHit();
    }

    const allSunk = () => {
        return ships.every(ship => ship.isSunk())
    }

    const getMissedShots = () => missedShots;

    const getBoard = () => board;

    const getAccurateShots = () => accurateShots;


    return { placeShip, receiveAttack, getMissedShots, isSunk, allSunk, getBoard, getAccurateShots, doesHit };
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
        if ((y+length-1) > 9) {
            throw new TypeError("Not enough space for the ship")
        }
    } else {
        if ((x+length-1) > 9) {
            throw new TypeError("Not enough space for the ship")
        }
    }
}