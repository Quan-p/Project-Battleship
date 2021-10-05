import GameBoard from '../gameboard/gameboard';

let testBoard;
beforeEach(() => {
    testBoard = new GameBoard();
});

test('initialize gameboard', () => {
    const array = [];
    for (let i = 0; i < 100; i += 1) {
        array.push({ hasShip: false, isShot: false });
    }
    expect(testBoard.board).toEqual(array);
});
