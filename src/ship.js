export const Ship = (length) => {
    let damage = 0;

    const hit = () => {
        damage++;
    }

    const isSunk = () => {
        return damage >= length ? true : false;
    }

    return { hit, isSunk };
}
