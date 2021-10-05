import GameBoard from '../gameboard/gameboard';

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
