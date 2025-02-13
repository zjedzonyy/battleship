import { Ship } from "../src/ship"

let s = Ship(1);

it('does it exist?', () => {
    expect(s).toBeDefined();
});


it("does it return an object?", () => {
    expect(typeof s).toBe('object');
});


it('has a hit() method', () => {
    expect(typeof s.hit).toBe('function');
})

 
it('has an isSunk() method', () => {
    expect(typeof s.isSunk).toBe('function');
})


describe('Ship logic', () => {
  test.each([
    [1, 0, false],
    [1, 1, true],
    [5, 4, false],
    [5, 5, true],
  ])(
    'ship of length %i after %i hits => sunk? %p',
    (length, hits, expected) => {
      const s = Ship(length);
      expect(s.isSunk()).toBe(false);

      for (let i = 0; i < hits; i++) {
        s.hit();
      }

      expect(s.isSunk()).toBe(expected);
    }
  );
});

