import Player from '../player/player';

describe('player mock test', () => {
    let player;
    let testBoard;
    beforeEach(() => {
        player = new Player('Quan');

        testBoard = {
            aiBoard: [],
            receiveShot: jest.fn((loc) => {
                testBoard.aiBoard[loc] = 'miss';
                return true;
            }),
            opponentBoard: jest.fn(() => testBoard.aiBoard),
        };
        const arr = [];
        for (let i = 0; i < 100; i += 1) {
            arr.push('empty');
        }
        testBoard.aiBoard = arr;
    });
    test('create player with name', () => {
        expect(player.name).toBe('Quan');
    });

    test('test firing shot to gameboard', () => {
        player.fireShot(50, testBoard);
        expect(testBoard.receiveShot.mock.calls.length).toBe(1);
    });

    test('check location push', () => {
        player.fireShot(50, testBoard);
        expect(testBoard.aiBoard).toBe(50);
    });
});
