import newElement from '../createElement';
import {
    GameMessages, BoardSpaceStatus, AttackStatus, BoardSize, Direction 
} from './shipMessage';

class ShipDom {
    constructor(fleet) {
        this.fleet = fleet;
        this.sendMessage = null;
        this.resetButton = this.resetButton.bind(this);
        this.startGame = this.startGame.bind(this);
        this.sendRotate = this.sendRotate.bind(this);
        this.selectShipToPlace = this.selectShipToPlace.bind(this);
    }
}

export default ShipDom;
