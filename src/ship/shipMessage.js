const GameState = {
    playerTurn: 0,
    compTurn: 1,
    gameEnd: 2,
    transition: 3,
    preGame: 4,
    placeShips: 5,
    welcome: 6,
    gameStart: 7,
    reset: 8,
};

const GameMessages = {
    StartGame: 0,
    DrawCpuBoard: 1,
    DrawPlayerBoard: 2,
    ResetGame: 3,
    Rotate: 4,
};

const BoardSpaceStatus = {
    empty: 0,
    emptyHit: 1,
    ship: 2,
    shipHit: 3,
    shipSunk: 4,
};

const Direction = {
    right: 0,
    down: 1,
    left: 2,
    up: 3,
};

const AttackStatus = {
    hit: 0,
    miss: 1,
    sunk: 2,
    invalid: 3,
};

const BoardSize = 8;

export {
    GameState,
    GameMessages,
    BoardSpaceStatus,
    Direction,
    AttackStatus,
    BoardSize,
};
