import { Player } from "../src/player";

describe("Player", () => {
    it('should be defined', () => {
        expect(Player).toBeDefined()
    })

    let player;
    beforeEach(() => {
        player = Player();
    })

    it('should return an object', () => {
        expect(typeof player).toBe('object')
    })

    it('should set and get CPU status', () => {
        expect(player.getIsCPU()).toBe(false);
        player.setIsCPU(true);
        expect(player.getIsCPU()).toBe(true);
        player.setIsCPU(false);
        expect(player.getIsCPU()).toBe(false);
    })

    it('check their gameboards', () => {
        player.board.placeShip(0, 0, 1, 'horizontal')
        player.board.receiveAttack(0,0)
        expect(player.board.allSunk()).toBe(true)
    })

    it('prevent wrong types', () => {
        expect(() => player.setIsCPU("true")).toThrow(TypeError)
        expect(() => player.setIsCPU(NaN)).toThrow(TypeError)
        expect(() => player.setIsCPU(undefined)).toThrow(TypeError)
    })
})