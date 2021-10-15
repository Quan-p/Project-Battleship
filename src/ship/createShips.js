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
        this.body = document.querySelectorAll('body');

        this.createElementsForShipPlacement();
        this.createElementsForGame();
        this.createElementsForStartPage();
    }

    createElementsForStartPage() {
        this.introParent = newElement.newElement('div', 'intro');
        this.introTitle = newElement.newElement('h1', 'intro-title');
        this.introMessage = newElement.newElement('p', 'intro-message');
        this.introButton = newElement.newElement('button', 'intro-button');

        this.introTitle.innerText = 'BATTLESHIP';
        this.introMessage.innerText = "Please place the 5 ships of your fleet on the board.  To win, be the first to sink all 5 of your opponent's ships";
        this.introButton.innerText = 'START GAME';

        this.introButton.addEventListener('click', this.startGame);
        this.introParent.appendChild(this.introTitle);
        this.introParent.appendChild(this.introMessage);
        this.introParent.appendChild(this.introButton);
        // this.body.textContent = '';
        this.body.appendChild(this.introParent);
    }

    createElementsForShipPlacement() {
        this.playSpace = newElement.newElement('div', 'play-space');

        this.rotateButton = newElement.newElement('button', 'rotate-button');
        this.rotateButton.innerText = ' ROTATE';
        this.rotateButton.addEventListener('click', this.sendRotate);

        this.testGrid = newElement.newElement('div', 'test-grid');
        for (let i = 0; i < 25; i += 1) {
            this.testGrid.appendChild(newElement.newElement('div', 'testGrid-empty'));
        }
        this.testShip = newElement.newElement('div', 'test-ship');
        this.fleetWrapper = newElement.newElement('div', 'fleet-wrapper');
        this.fleetWrapper.addEventListener('click', this.selectShipToPlace);

        this.addFleetButtons();

        this.playSpace.appendChild(this.rotateButton);
        this.playSpace.appendChild(this.testGrid);
        this.playSpace.appendChild(this.fleetWrapper);
        this.testGrid.appendChild(this.testShip);
    }

    setShip(callback) {
        this.selectShip = callback;
    }

    selectShipToPlace(e) {
        this.selectShip(Number(e.target.dataset.index));
    }

    focusFleetButton(index) {
        for (let i = 0; i < this.fleetWrapper.childNodes.length; i += 1) {
            if (Number(this.fleetWrapper.childNodes[i].dataset.index) === index) {
                this.fleetWrapper.childNodes[i].classList.add('fleet-button-focus');
            } else {
                this.fleetWrapper.childNodes[i].classList.remove('fleet-button-focus');
            }
        }
    }

    addFleetButtons() {
        for (let i = 0; i < this.fleet.length; i += 1) {
            const btn = newElement.newElement('button', 'fleet-wrapper-button');
            // btn.style.gridColumn = `1 / span ${this.fleet[i].length}';
            // style this separately
            btn.dataset.index = i;
            this.fleetWrapper.appendChild(btn);
        }
    }

    removeAllFleetButtons() {
        this.fleetWrapper.textContent = '';
    }

    removeFleetButton(index) {
        for (let i = 0; i < this.fleetWrapper.childNodes.length; i += 1) {
            if (Number(this.fleetWrapper.childNodes[i].dataset.index) === index) {
                this.fleetWrapper.removeChild(this.fleetWrapper.childNodes[i]);
            }
        }
    }
}

export default ShipDom;
