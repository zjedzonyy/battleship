import { Gameboard } from "./gameboard"

export const Player = () => {
    let isCPU = false; 

    const setIsCPU = (value) => {
        if (typeof value !== 'boolean') {
            throw new TypeError("Input must be Boolean")
        }
        isCPU = value === true;
    };

    const getIsCPU = () => isCPU;

    const board = Gameboard();

    return { setIsCPU, getIsCPU, board };
};
