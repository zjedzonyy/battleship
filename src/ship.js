export const Ship = (length) => {
    if (typeof length !== "number" || Number.isNaN(length) || !Number.isSafeInteger(length)) {
        throw new TypeError("Coordinates must be numbers");
    }

    if (length < 1 || length > 5) {
        throw new TypeError("Length must a number between 1 and 5")
    } 

    let damage = 0;

    const hit = () => {
        damage++;
    }

    const isSunk = () => {
        return damage >= length ? true : false;
    }

    const doesHit = () => {
        return true;
    }

    return { hit, isSunk, doesHit };
}

