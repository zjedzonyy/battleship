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
      gb.placeShip(6, 0, 3, "vertical");
    });

    test.each([
      [0, 0, true],
      [1, 0, false],
      [1, 1, false],
      [8, 0, true],
      [9, 5, false],
      [9, 2, false]
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
      gb.receiveAttack(0,1);
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
      gb.receiveAttack(0,1);
      gb.receiveAttack(9,0);

      expect(gb.allSunk()).toBe(true);
    });
  });


  describe('prevent impermissible placeShip()', () => {
    it('handles out-of-bounds coordinates', () => {
      const invalidCoordinates = [
        [-1, -4], [1, -9], [-3, -9], [10, 9], [0, 10], [14, 21]
      ];
      invalidCoordinates.forEach(([x, y]) => {
        expect(() => gb.placeShip(x, y, 2, 'horizontal')).toThrow(TypeError);
      });
    });
  
    it('handles decimals in coordinates and length', () => {
      const invalidValues = [
        [1.5, 2, 2], [2, 3.3, 2], [-1.3, 3.3, 2], [0, 0, 2.137]
      ];
      invalidValues.forEach(([x, y, length]) => {
        expect(() => gb.placeShip(x, y, length, 'horizontal')).toThrow(TypeError);
      });
    });
  
    it('handles wrong types', () => {
      const invalidTypes = [
        ['1', -4, 2], [1, '-4', 2], [NaN, 4, 2], [1, undefined, 2], [0, 0, 'asdf']
      ];
      invalidTypes.forEach(([x, y, length]) => {
        expect(() => gb.placeShip(x, y, length, 'horizontal')).toThrow(TypeError);
      });
    });
  
    it('handles out-of-bounds length', () => {
      const invalidLengths = [
        [0, 1, 0], [0, 1, 6]
      ];
      invalidLengths.forEach(([x, y, length]) => {
        expect(() => gb.placeShip(x, y, length, 'horizontal')).toThrow(TypeError);
      });
    });
  
    it('handles if there is no place for ship', () => {
      const noSpaceTestCases = [
        [0, 9, 3, 'horizontal'], [9, 9, 3, 'horizontal'], [9, 0, 3, 'hsdl']
      ];
      noSpaceTestCases.forEach(([x, y, length, orientation]) => {
        expect(() => gb.placeShip(x, y, length, orientation)).toThrow(TypeError);
      });
    });

    it('handles if the ship is to close to another', () => {
      gb.placeShip(5, 2, 5, 'horizontal')

      const testCases = [
        [4, 2, 5, 'horizontal'], [6, 2, 6, 'horizontal'], [4, 1, 5, 'v'], [3, 7, 2, 'v']
      ]
      testCases.forEach(([x, y, length, orientation]) => {
        expect(() => gb.placeShip(x, y, length, orientation)).toThrow(TypeError);
      });
    })
  });
  
  describe('prevent impermissible receiveAttack() and isSunk()', () => {
    it('handles out-of-bounds coordinates', () => {
      const invalidCoordinates = [
        [10, 0], [0, -4]
      ];
      invalidCoordinates.forEach(([x, y]) => {
        expect(() => gb.receiveAttack(x, y)).toThrow(TypeError);
      });
    });
  
    it('handles decimals', () => {
      const invalidCoordinates = [
        [0, 4.4], [1.1, 4]
      ];
      invalidCoordinates.forEach(([x, y]) => {
        expect(() => gb.receiveAttack(x, y)).toThrow(TypeError);
      });
    });
  
    it('handles wrong types', () => {
      const invalidCoordinates = [
        [undefined, 4], [1, NaN], [1, 'asdf'], [false, 2]
      ];
      invalidCoordinates.forEach(([x, y]) => {
        expect(() => gb.receiveAttack(x, y)).toThrow(TypeError);
      });
    });
  });
  

});
