import { Gameboard } from "./gameboard"

export const Player = () => {
    let isCPU = false; 

    const setIsCPU = (value) => {
        isCPU = value === true;
    };

    const getIsCPU = () => isCPU;

    const board = Gameboard();

    return { setIsCPU, getIsCPU, board };
};
