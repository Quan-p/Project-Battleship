import GameBoard from './gameBoard';
import ShipDom from '../ship/createShips';
import Ship from '../ship/ship';
import {
    GameState,
    GameMessages,
    Direction,
    AttackStatus,
    ShipNames,
} from '../ship/shipMessage';

class GameManager {
    constructor() {
        this.clickSquare = this.clickSquare.bind(this);
        this.hoverSquare = this.hoverSquare.bind(this);
        this.leaveSquare = this.leaveSquare.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.rotateShip = this.rotateShip.bind(this);
        this.startCpuTurn = this.startCpuTurn.bind(this);
        this.setPlacementIndex = this.setPlacementIndex.bind(this);

        const playerCarrier = new Ship(5);
        const playerBattleship = new Ship(4);
        const playerSubmarine = new Ship(3);
        const playerCruiser = new Ship(3);
        const playerDestroyer = new Ship(2);

        this.playerShips = [
            playerCarrier,
            playerBattleship,
            playerSubmarine,
            playerCruiser,
            playerDestroyer,
        ];

        const fleetDom = this.playerShips.map(GameManager.shipsToFleetDom);

        this.battleshipDom = new ShipDom(fleetDom);
        this.battleshipDom.setClickEventHandler(this.clickSquare);
        this.battleshipDom.setHoverEventHandler(this.hoverSquare);
        this.battleshipDom.setMouseLeaveEventHandler(this.leaveSquare);
        this.battleshipDom.setMessageFunction(this.receiveMessage);
        this.battleshipDom.setRightClickEventHandler(this.rotateShip);
        this.battleshipDom.setShip(this.setPlacementIndex);

        this.testMode = false;
        this.playerWon = false;
    }

    static shipsToFleetDom(element, i) {
        return { length: element.length, name: ShipNames[i] };
    }

    init() {
        this.placementDirection = Direction.right;
        this.placementComplete = new Array(this.playerShips.length);
        for (let i = 0; i < this.placementComplete.length; i += 1) {
            this.placementComplete[i] = false;
        }

        for (let i = 0; i < this.playerShips.length; i += 1) {
            this.playerShips[i].reset();
        }

        this.setPlacementIndex(0);

        this.playerBoard = new GameBoard();
        this.cpuBoard = new GameBoard();

        this.battleshipDom.reset();
        this.battleshipDom.setCpuBoard(this.cpuBoard.boardState);
        this.battleshipDom.setPlayerBoard(this.playerBoard.boardState);
        this.battleshipDom.displayMessage('');

        this.updateDomShipProxy();

        this.gameState = GameState.placingShips;
    }

    // set testMode(value) {
    //     this.testMode = value;
    // }

    startGame() {
        if (this.testMode) {
            this.doTestSetup();
        } else {
            this.doSetup();
        }
    }

    doTestSetup() {
        const playerCarrier = new Ship(5);
        const playerBattleship = new Ship(4);
        const playerSubmarine = new Ship(3);
        const playerCruiser = new Ship(3);
        const playerDestroyer = new Ship(2);

        const cpuCarrier = new Ship(5);
        const cpuBattleship = new Ship(4);
        const cpuSubmarine = new Ship(3);
        const cpuCruiser = new Ship(3);
        const cpuDestroyer = new Ship(2);

        this.playerBoard.addShip(playerCarrier, 0, 0, Direction.down);
        this.playerBoard.addShip(playerBattleship, 0, 1, Direction.down);
        this.playerBoard.addShip(playerSubmarine, 0, 2, Direction.down);
        this.playerBoard.addShip(playerCruiser, 0, 3, Direction.down);
        this.playerBoard.addShip(playerDestroyer, 0, 4, Direction.down);

        this.cpuBoard.addShip(cpuCarrier, 7, 0, Direction.up);
        this.cpuBoard.addShip(cpuBattleship, 7, 1, Direction.up);
        this.cpuBoard.addShip(cpuSubmarine, 7, 2, Direction.up);
        this.cpuBoard.addShip(cpuCruiser, 7, 3, Direction.up);
        this.cpuBoard.addShip(cpuDestroyer, 7, 4, Direction.up);
    }

    doSetup() {
        const cpuCarrier = new Ship(5);
        const cpuBattleship = new Ship(4);
        const cpuSubmarine = new Ship(3);
        const cpuCruiser = new Ship(3);
        const cpuDestroyer = new Ship(2);

        GameManager.randomizeShipPlacement([
            cpuCarrier,
            cpuBattleship,
            cpuSubmarine,
            cpuCruiser,
            cpuDestroyer,
        ], this.cpuBoard);

        this.battleshipDom.setPlayerBoard(this.playerBoard.boardState);
        this.battleshipDom.setCpuBoard(this.cpuBoard.boardState);
    }

    static randomizeShipPlacement(ships, board) {
        for (let i = 0; i < ships.length; i += 1) {
            let validPlacement = false;

            while (!validPlacement) {
                const row = Math.round(Math.random() * 7);
                const col = Math.round(Math.random() * 7);
                const dir = Math.round(Math.random() * 3);

                validPlacement = board.addShip(ships[i], row, col, dir);
            }
        }
    }

    gameEnd() {
        if (this.playerBoard.checkAllShipsSunk()) {
            this.playerWon = false;
            return true;
        }
        if (this.cpuBoard.checkAllShipsSunk()) {
            this.playerWon = true;
            return true;
        }
        return false;
    }

    // logic for when player clicks a square
    clickSquare(e) {
        if (this.gameState === GameState.playerTurn) {
            if (e.target.dataset.board === 'cpu') {
                this.playerSelection({
                    row: Number(e.target.dataset.row),
                    col: Number(e.target.dataset.col),
                });
            }
        } else if (this.gameState === GameState.placingShips) {
            if (e.target.dataset.board === 'player') {
                if (
                    this.playerBoard.isValidPlacement(
                        this.playerShips[this.placeShipIndex],
                        Number(e.target.dataset.row),
                        Number(e.target.dataset.col),
                        this.placementDirection,
                    )
                ) {
                    this.playerBoard.addShip(
                        this.playerShips[this.placeShipIndex],
                        Number(e.target.dataset.row),
                        Number(e.target.dataset.col),
                        this.placementDirection,
                    );

                    this.placementComplete[this.placeShipIndex] = true;
                    this.battleshipDom.removeFleetButton(this.placeShipIndex);

                    let allTrue = true;
                    for (let i = 0; i < this.placementComplete.length; i += 1) {
                        if (this.placementComplete[i] === false) {
                            this.placeShipIndex = i;
                            allTrue = false;
                            break;
                        }
                    }
                    this.battleshipDom.setPlayerBoard(this.playerBoard.boardState);

                    if (allTrue) {
                        this.gameState = GameState.preGame;
                    } else {
                        this.updatePostShipSelect();
                    }
                }
            }
        }
    }

    updatePostShipSelect() {
        const message = `Place your ${ShipNames[this.placeShipIndex]}`;
        this.battleshipDom.displayMessage(message);
        this.battleshipDom.highlightFleetButton(this.placeShipIndex);
        this.updateDomShipProxy();
    }

    updateDomShipProxy() {
        this.battleshipDom.rotateTestShip(
            this.playerShips[this.placeShipIndex].length,
            this.placementDirection,
        );
    }

    hoverSquare(e) {
        if (this.gameState === GameState.placingShips) {
            if (
                e.target.dataset.row !== this.cachedRow
                || e.target.dataset.col !== this.cachedCol
            ) {
                this.battleshipDom.removeHighlightSquares();
            }
            this.cachedRow = e.target.dataset.row;
            this.cachedCol = e.target.dataset.col;

            if (e.target.classList.contains('battleship-square')) {
                const row = Number(e.target.dataset.row);
                const col = Number(e.target.dataset.col);
                if (
                    this.playerBoard.isValidPlacement(
                        this.playerShips[this.placeShipIndex],
                        row,
                        col,
                        this.placementDirection,
                    )
                ) {
                    const squaresToHighlight = GameBoard.getCoordsToCheck(
                        this.playerShips[this.placeShipIndex],
                        row,
                        col,
                        this.placementDirection,
                    );
                    this.battleshipDom.highlightSquares(squaresToHighlight, true);
                } else {
                    const squaresToHighlight = GameBoard.getCoordsToCheck(
                        this.playerShips[this.placeShipIndex],
                        row,
                        col,
                        this.placementDirection,
                    );
                    this.battleshipDom.highlightSquares(squaresToHighlight, false);
                }
            }
        }
    }

    leaveSquare() {
        if (this.gameState === GameState.placingShips) {
            this.battleshipDom.removeHighlightSquares();
        }
    }

    rotateShip(e) {
        if (e != null && e !== undefined) {
            e.preventDefault();
        }

        if (this.placementDirection !== Direction.up) {
            this.placementDirection += 1;
        } else {
            this.placementDirection = Direction.right;
        }

        if (e !== null && e !== undefined) {
            this.leaveSquare();
            this.hoverSquare(e);
        }

        this.updateDomShipProxy();
        return false;
    }

    playerSelection(selection) {
        const selectionStatus = this.cpuBoard.receiveAttack(
            selection.row,
            selection.col,
        );

        if (selectionStatus !== AttackStatus.invalid) {
            this.gameState = GameState.transition;
            this.setDomPlayerMove(selection.row, selection.col, selectionStatus);

            if (this.gameEnd()) {
                this.doGameEnd();
            } else {
                this.gameState = GameState.cpuTurn;
                setTimeout(this.startCpuTurn, 300);
            }
        }
    }

    setDomPlayerMove(row, col, status) {
        this.battleshipDom.getPlayerMove(row, col, status);
    }

    startCpuTurn() {
        let selectionStatus = AttackStatus.invalid;
        let row = -1;
        let col = -1;
        while (selectionStatus === AttackStatus.invalid) {
            row = Math.round(Math.random() * 7);
            col = Math.round(Math.random() * 7);

            selectionStatus = this.playerBoard.receiveAttack(row, col);
        }

        this.gameState = GameState.transition;
        this.setDomCpuMove(row, col, selectionStatus);

        if (this.gameEnd()) {
            this.doGameEnd();
        } else {
            this.gameState = GameState.playerTurn;
        }
    }

    setDomCpuMove(row, col, status) {
        this.battleshipDom.getCpuMove(row, col, status);
    }

    doGameEnd() {
        this.gameState = GameState.gameEnd;
        let stateWin = '';
        if (this.playerWon) {
            stateWin = 'You Won!';
        } else {
            stateWin = 'You Lose.';
        }
        this.battleshipDom.displayMessage(`Game Over. ${stateWin}`);
    }

    receiveMessage(msg) {
        switch (msg) {
        case GameMessages.StartGame: {
            this.battleshipDom.setGameplayElements();
            this.init();
            break;
        }
        case GameMessages.DrawCpuBoard: {
            this.battleshipDom.setCpuBoard(this.cpuBoard.boardState);
            break;
        }
        case GameMessages.DrawPlayerBoard: {
            this.battleshipDom.setPlayerBoard(this.playerBoard.boardState);
            break;
        }
        case GameMessages.ResetGame: {
            this.resetMessage();
            break;
        }
        case GameMessages.Rotate: {
            if (this.gameState === GameState.placingShips) {
                this.rotateShip();
                this.updateDomShipProxy();
            }
            break;
        }
        default:
            break;
        }
    }

    resetMessage() {
        this.gameState = GameState.reset;
        this.init();
        this.battleshipDom.removeAllFleetButtons();
        this.battleshipDom.addFleetButtons();
        this.setPlacementIndex(0);
    }

    setPlacementIndex(indexValue) {
        if (this.placementComplete[indexValue] === false) {
            this.placeShipIndex = indexValue;
            this.updatePostShipSelect();
        }
    }

    // proxy for tests
    set gameState(value) {
        this.testGameState = value;

        if (this.gameState === GameState.preGame) {
            this.gameState = GameState.gameStart;
            this.startGame();
            this.battleshipDom.displayMessage('Attack your opponent');
        }
        if (this.gameState === GameState.reset) {
            this.battleshipDom.makePlayerBoardRegular();
            this.battleshipDom.showPlacementOptions();
        } else if (this.gameState === GameState.gameStart) {
            this.battleshipDom.makePlayerBoardSmall();
            this.battleshipDom.hidePlacementOptions();
            this.gameState = GameState.playerTurn;
        } else if (this.gameState === GameState.placingShips) {
            const message = `Place your ${ShipNames[this.placeShipIndex]}`;
            this.battleshipDom.displayMessage(message);
            // only show player board when placing ships
            this.battleshipDom.hideCpuBoard();
        } else if (this.gameState === GameState.playerTurn) {
            this.battleshipDom.showCpuBoard();
        } else if (this.gameState === GameState.transition) {
            this.battleshipDom.displayMessage('');
        }
    }

    get gameState() {
        return this.testGameState;
    }
}

export default GameManager;
