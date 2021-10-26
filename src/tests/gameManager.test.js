import { GameMessages, AttackStatus, GameState } from '../ship/shipMessage';
import GameManager from '../gameboard/gameManager';

beforeAll(() => {
    jest.spyOn(GameManager.prototype, 'sendPlayerMoveToDom');

    jest.spyOn(GameManager.prototype, 'sendCpuMoveToDom');
});

afterAll(() => {
    jest.restoreAllMocks();
});
