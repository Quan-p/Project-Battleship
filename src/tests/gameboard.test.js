import GameBoard from '../gameboard/gameboard';
import shipTypes from '../ship/shipTypes';

let testBoard;
beforeEach(() => {
    testBoard = new GameBoard();
});

test('initialize gameboard', () => {
    const array = [];
    for (let i = 0; i < 100; i += 1) {
        array.push({ hasShip: false, isHit: false });
    }
    expect(testBoard.board).toEqual(array);
});

test('update cell to be labeled as hit', () => {
    testBoard.receiveAttack(90);
    expect(testBoard.board[90].isHit).toBe(true);
});

test('returns false on a miss', () => {
    expect(testBoard.checkIfAttackHit(50)).toBe(false);
});

test('confirms an attack hit', () => {
    testBoard.board[99].hasShip = true;
    expect(testBoard.checkIfAttackHit(99)).toBe(true);
});

test('checks ship overlap on placement', () => {
    testBoard.board[10].hasShip = 'submarine';
    expect(testBoard.checkOverlap([10, 20, 30])).toBe(false);
});
