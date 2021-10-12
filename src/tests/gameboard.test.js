import GameBoard from '../gameboard/gameboard';
import shipTypes from '../ship/shipTypes';
import Ship from '../ship/ship';
import { Direction, AttackStatus } from '../ship/shipMessage';

let testBoard;
let carrier;
beforeEach(() => {
    testBoard = new GameBoard();
    carrier = new Ship(3);
});

test('add ships to invalid spots, expect false', () => {
    expect(testBoard.addShip(carrier, -1, -1, Direction.right)).toBe(false);
});

test('check for ship placement overflow to the right to return false', () => {
    expect(testBoard.addShip(carrier, 0, 10, Direction.right)).toBe(false);
});
