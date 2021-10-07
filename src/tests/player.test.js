import Player from '../player/player';

describe('player mock test', () => {
    let player;

    beforeEach(() => {
        player = new Player('Quan');

        const testBoard = {
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
});
