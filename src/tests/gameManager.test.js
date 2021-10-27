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

test('Test player click at row 7, col 0, expect dom to update 7, 0, with hit', () => {
    const gm = new GameManager();
    gm.testMode = true;
    gm.receiveMessage(GameMessages.StartGame);
    gm.gameState = GameState.preGame;

    const playerMove = {
        target: {
            dataset: {
                row: 7,
                col: 0,
                board: 'cpu',
            },
        },
    };
    gm.clickSquare(playerMove);
    expect(gm.setDomPlayerMove).toBeCalledWith(7, 0, AttackStatus.hit);
});

const testGame1 = new GameManager();
testGame1.testMode = true;
testGame1.receiveMessage(GameMessages.StartGame);
testGame1.gameState = GameState.preGame;
describe('Sink all of the ships', () => {
    test('Test hit on row 6, col 4, expecting the dom to update at 6, 4 with sunk', () => {
        const playerMove1 = {
            target: {
                dataset: {
                    row: 7,
                    col: 4,
                    board: 'cpu',
                },
            },
        };

        testGame1.clickSquare(playerMove1);
        testGame1.gameState = GameState.playerTurn;

        const playerMove2 = {
            target: {
                dataset: {
                    row: 6,
                    col: 4,
                    board: 'cpu',
                },
            },
        };

        testGame1.clickSquare(playerMove2);

        expect(testGame1.setDomPlayerMove).toBeCalledWith(6, 4, AttackStatus.sunk);
    });
});
