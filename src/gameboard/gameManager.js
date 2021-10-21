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
}

export default GameManager;
