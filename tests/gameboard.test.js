import { Gameboard } from "../src/gameboard";

describe("Gameboard", () => {
  let gb;

  beforeEach(() => {
    gb = Gameboard();
  });


  it("should be defined", () => {
    expect(Gameboard).toBeDefined();
  });

  it("should return an object instance", () => {
    expect(typeof gb).toBe("object");
  });

  it("should have a placeShip method", () => {
    expect(typeof gb.placeShip).toBe("function");
  });

  it("should have a receiveAttack method", () => {
    expect(typeof gb.receiveAttack).toBe("function");
  });

  it("should have an allSunk method", () => {
    expect(typeof gb.allSunk).toBe("function");
  });

  //
  // Hits tests
  //
  describe("Attacks (hits/misses)", () => {
    beforeEach(() => {
      gb.placeShip(0, 0, 4, "horizontal");
      gb.placeShip(9, 0, 3, "vertical");
    });

    test.each([
      [0, 0, true],
      [1, 0, true],
      [1, 1, false],
      [9, 0, true],
      [9, 5, false],
      [9, 2, true]
    ])(
      "shot on (%i, %i) => hit? %p",
      (x, y, expected) => {
        expect(gb.receiveAttack(x, y)).toBe(expected);
      }
    );
  });

  //
  // Sinking tests
  //
  describe("Sinking logic", () => {
    it("should report single-ship not sunk after partial hits", () => {
      gb.placeShip(0, 0, 2, "horizontal");
      gb.placeShip(9, 0, 1, "vertical");

      gb.receiveAttack(0, 0);

      expect(gb.isSunk(0, 0)).toBe(false); 
      expect(gb.isSunk(9, 0)).toBe(false); 
    });

    it("should report ships sunk after enough hits", () => {
      gb.placeShip(0, 0, 2, "horizontal");  
      gb.placeShip(9, 0, 1, "vertical");    

      gb.receiveAttack(0,0);
      gb.receiveAttack(1,0);
      gb.receiveAttack(9,0);

      expect(gb.isSunk(0,0)).toBe(true);  
      expect(gb.isSunk(9,0)).toBe(true);  
    });
  });

  //
  // Missed shots tests
  //
  describe("Missed shots", () => {
    beforeEach(() => {
      gb.placeShip(0, 0, 2, "horizontal");
      gb.placeShip(9, 0, 1, "vertical");
    });

    it("should record missed coordinates", () => {
      gb.receiveAttack(0, 0);   
      gb.receiveAttack(3, 5);   
      gb.receiveAttack(8, 8);   

      expect(gb.getMissedShots()).toEqual([[3, 5], [8, 8]]);
    });
  });

  //
  // allSunk() tests
  //
  describe("allSunk() method", () => {
    it("returns false if at least one ship isn't sunk", () => {
      gb.placeShip(0, 0, 2, 'horizontal');
      gb.placeShip(9, 0, 1, 'vertical');


      expect(gb.allSunk()).toBe(false);
    });

    it("returns true if all ships have been sunk", () => {
      gb.placeShip(0, 0, 2, "horizontal");
      gb.placeShip(9, 0, 1, "vertical");

      gb.receiveAttack(0,0);
      gb.receiveAttack(1,0);
      gb.receiveAttack(9,0);

      expect(gb.allSunk()).toBe(true);
    });
  });
});
