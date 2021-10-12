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
    expect(testBoard.addShip(submarine, 0, 4, Direction.up)).toBe(false);
});

test('Add ship at position that will overflow board left, expect false', () => {
    expect(testBoard.addShip(submarine, 1, 1, Direction.left)).toBe(false);
});

test('Add ship at position that will overflow board down, expect false', () => {
    expect(testBoard.addShip(submarine, 6, 6, Direction.down)).toBe(false);
});

test('Add ship at valid position, expect true', () => {
    expect(testBoard.addShip(submarine, 0, 0, Direction.right)).toBe(true);
});

test('return miss on atttacking empty spot', () => {
    expect(testBoard.receiveAttack(4, 4)).toBe(AttackStatus.miss);
});

test('check for invalid shot at spot thats already been attacked', () => {
    expect(testBoard.receiveAttack(4, 4)).toBe(AttackStatus.invalid);
});

test('check for valid hit on a ship', () => {
    expect(testBoard.receiveAttack(0, 0)).toBe(AttackStatus.hit);
});

test('check for valid hit on a ship', () => {
    expect(testBoard.receiveAttack(0, 1)).toBe(AttackStatus.hit);
});

test('check for valid hit on a ship', () => {
    expect(testBoard.receiveAttack(0, 2)).toBe(AttackStatus.sunk);
});

test('check for second invalid shot on a ship already shot', () => {
    expect(testBoard.receiveAttack(0, 1)).toBe(AttackStatus.invalid);
});

test('check for second invalid shot on a ship already shot', () => {
    expect(testBoard.receiveAttack(0, 2)).toBe(AttackStatus.invalid);
});
