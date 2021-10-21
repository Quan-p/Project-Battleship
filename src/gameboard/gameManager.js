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
        this.cpuTurn = this.cpuTurn.bind(this);
        this.setPlacementIndex = this.setPlacementIndex.bind(this);

        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const submarine = new Ship(3);
        const cruiser = new Ship(3);
        const destroyer = new Ship(2);

        const playerShips = [
            carrier,
            battleship,
            submarine,
            cruiser,
            destroyer,
        ];

        const fleetDom = this.playerShips.map(GameManager.shipsToFleetDom);

        this.battleshipDom = new ShipDom(fleetDom);
        this.battleshipDom.setClickEventHandler(this.clickSquare);
        this.battleshipDom.setHoverEventHandler(this.hoverSquare);
        this.battleshipDom.setMouseLeaveEventHandler(this.leaveSquare);
        this.battleshipDom.setMessageFunction(this.receiveMessage);
        this.battleshipDom.setClickEventHandler(this.rotateShip);
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

        for (let i = 0; i < playerShips.length; i += 1) {
            this.playerShips[i].reset();
        }

        this.setPlacementIndex(0);

        this.playerBoard = new GameBoard();
        this.cpuBoard = new GameBoard();

        this.battleshipDom.reset();
        this.battleshipDom.setCpuBoard(this.cpuBoard.boardState);
        this.battleshipDom.setPlayerBoard(this.playerBoard.boardState);
        this.battleshipDom.dispayMessage('');

        this.updateDomShipProxy();

        this.gameState = this.GameState.placeShips;
    }

    set testMode(value) {
        this.testMode = value;
    }

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
}

export default GameManager;
