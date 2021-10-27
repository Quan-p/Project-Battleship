/**
 * @jest-environment jsdom
 */

import { GameMessages, AttackStatus, GameState } from '../ship/shipMessage';
import GameManager from '../gameboard/gameManager';

beforeAll(() => {
    jest.spyOn(GameManager.prototype, 'setDomPlayerMove');

    jest.spyOn(GameManager.prototype, 'setDomCpuMove');
});

afterAll(() => {
    jest.restoreAllMocks();
});

test('Test player click at 0, 0, expect dom to update 0, 0, with miss', () => {
    const testGame = new GameManager();
    testGame.testMode = true;
    testGame.receiveMessage(GameMessages.StartGame);
    testGame.gameState = GameState.preGame;

    const playerMove = {
        target: {
            dataset: {
                row: 0,
                col: 0,
                board: 'cpu',
            },
        },
    };
    testGame.clickSquare(playerMove);
    expect(testGame.setDomPlayerMove).toBeCalledWith(0, 0, AttackStatus.miss);
});

// test('Test player click at row 7, col 0, expect dom to update 7, 0, with hit', () => {
//     const gm = new GameManager();
//     gm.testMode = true;
//     gm.receiveMessage(GameMessages.StartGame);
//     gm.gameState = GameState.preGame;

//     const playerMove = {
//         target: {
//             dataset: {
//                 row: 7,
//                 col: 0,
//                 board: 'cpu',
//             },
//         },
//     };
//     gm.clickSquare(playerMove);
//     expect(gm.setDomPlayerMove).toBeCalledWith(7, 0, AttackStatus.hit);
// });
