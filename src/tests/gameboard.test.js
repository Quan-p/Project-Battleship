import GameBoard from '../gameboard/gameboard';
import Ship from '../ship/ship';
import { Direction, AttackStatus } from '../ship/shipMessage';

const testBoard = new GameBoard();
const submarine = new Ship(3);

test('add ships to invalid spots, expect false', () => {
    expect(testBoard.addShip(submarine, 0, -1, Direction.right)).toBe(false);
});

test('check for ship placement overflow to the right to return false', () => {
    expect(testBoard.addShip(submarine, 0, 7, Direction.right)).toBe(false);
});

test('check for ship placement overflow upwards to return false', () => {
    expect(testBoard.addShip(submarine, 0, 7, Direction.up)).toBe(false);
});
