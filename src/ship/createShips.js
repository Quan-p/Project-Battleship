import newElement from '../createElement';
import {
    GameMessages, BoardSpaceStatus, AttackStatus, BoardSize, Direction 
} from './shipMessage';

class ShipDom {
    constructor(fleet) {
        this.fleet = fleet;
        this.sendMessage = null;
        this.resetGame = this.resetGame.bind(this);
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
        this.placementPreviewSpace = newElement.newElement('div', 'placement-preview-space');

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

        this.placementPreviewSpace.appendChild(this.rotateButton);
        this.placementPreviewSpace.appendChild(this.testGrid);
        this.placementPreviewSpace.appendChild(this.fleetWrapper);
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

    createGameElements() {
        this.title = newElement.newElement('div', 'game-title');
        this.titleContent = newElement.newElement('h1', 'game-title-content');
        this.titleContent.innerText = 'BATTLESHIP';
        this.title.appendChild(this.titleContent);

        this.playingField = newElement.newElement('div', 'playing-field');
        this.playerField = newElement.newElement('div', 'player-field');
        this.cpuField = newElement.newElement('div', 'player-field');
        this.playerTitle = newElement.newElement('h2', 'player-title');
        this.playerTitle = newElement.newElement('h2', 'player-title');
        this.cpuTitle = newElement.newElement('h2', 'player-title');
        this.playerTitle.innerText = 'YOUR WATERS';
        this.cpuTitle.innerText = 'CPU WATERs';

        this.playerBoard = newElement.newElement('div', 'player-field-grid');
        this.cpuBoard = newElement.newElement('div', 'player-field-grid');

        this.playerMessage = newElement.newElement('div', 'player-field-message');
        this.cpuMessage = newElement.newElement('div', 'player-field-message');
        this.playerMessage.innerText = ' ';
        this.cpuMessage.innerText = ' ';

        this.stageInfo = newElement.newElement('div', 'stage-info');
        this.tempMessages = newElement.newElement('h3', 'stage-temp-messages');
        this.tempMessages.innerText = ' ';
        this.stageInfo.appendChild(this.tempMessages);

        this.playerField.appendChild(this.playerTitle);
        this.playerField.appendChild(this.playerBoard);
        this.playerField.appendChild(this.playerMessage);

        this.cpuField.appendChild(this.cpuTitle);
        this.cpuField.appendChild(this.cpuBoard);
        this.cpuField.appendChild(this.cpuMessage);

        this.resetField = newElement.newElement('div', 'reset-field');
        this.resetButton = newElement.newElement('button', 'reset-field-button');
        this.resetButton.innerText = 'RESET';
        this.resetButton.addEventListener('click', this.resetGame);
        this.resetField.appendChild(this.resetButton);

        this.playingField.appendChild(this.playerField);
        this.playingField.appendChild(this.placementPreviewSpace);
        this.playingField.appendChild(this.cpuField);
    }

    setGameplayElements() {
        this.body.textContent = '';
        this.body.appendChild(this.title);
        this.body.appendChild(this.stageInfo);
        this.body.appendChild(this.stageInfo);

        ShipDom.createGameboard(this.playerBoard);
    }

    reset() {
        this.playerMessage.innerText = '';
        this.cpuMessage.innerText = '';
    }

    setPlayerBoard(boardState) {
        ShipDom.setBoard(this.playerBoard, boardState, 'player', false);
    }

    setCpuBoard(boardState) {
        ShipDom.setBoard(this.cpuBoard, boardState, 'cpu', true);
    }

    setClickEventHandler(callback) {
        this.clickCallback = callback;
        this.playerBoard.addEventListener('click', callback);
        this.cpuBoard.addEventListener('click', callback);
    }

    setHoverEvent(callback) {
        this.playerBoard.addEventListener('mouseover', callback);
    }

    setMouseLeaveEvent(callback) {
        this.playerBoard.addEventListener('mouseleave', callback);
    }

    setRightClickEvent(callback) {
        this.playerBoard.addEventListener('contextmenu', callback, false);
    }

    setMessageFunction(fn) {
        this.sendMessage = fn;
    }

    resetGame() {
        this.sendMessage(GameMessages.ResetGame);
    }

    static createGameboard(board) {
        for (let i = 0; i < BoardSize; i += 1) {
            for (let j = 0; j < BoardSize; j += 1) {
                const square = newElement.newElement('div', ['battleship-square--empty', 'battleship-square']);
                board.appendChild(square);
            }
        }
    }

    static setBoard(board, boardState, player, hidden) {
        while (board.lastChild) {
            board.removeChild(board.firstChild);
        }

        for (let i = 0; i < boardState.length; i += 1) {
            for (let j = 0; j < boardState[i].length; j += 1) {
                const square = newElement.newElement('div');
                square.dataset.row = i;
                square.dataset.col = j;
                square.dataset.board = player;
                square.classList.add('battleship-square');

                switch (boardState[i][j]) {
                case BoardSpaceStatus.empty: {
                    square.classList.add('battleship-square--empty');
                    break;
                }
                case BoardSpaceStatus.emptyHit: {
                    square.classList.add('battleship-square--empty-hit');
                    break;
                }
                case BoardSpaceStatus.ship: {
                    if (!hidden) {
                        square.classList.add('battleship-square--ship');
                    } else {
                        square.classList.add('battleship-square--empty');
                    }
                    break;
                }
                case BoardSpaceStatus.shipHit: {
                    square.classList.add('battleship-square--ship-hit');
                    break;
                }
                case BoardSpaceStatus.shipSunk: {
                    square.classList.add('battleship-square--ship-sunk');
                    break;
                }
                default: break;
                }
                board.appendChild(square);
            }
        }
    }

    getPlayerMove(row, col, status) {
        ShipDom.getMove(row, col, status, this.cpuBoard);
        if (status === AttackStatus.sunk) {
            this.sendMessage(GameMessages.DrawCpuBoard);
        }
        this.setCpuMessage(status);
    }

    getCpuMove(row, col, status) {
        ShipDom.getMove(row, col, status, this.playerBoard);
        if (status === AttackStatus.sunk) {
            this.sendMessage(GameMessages.DrawPlayerBoard);
        }
        this.setPlayerMessage(status);
    }

    static getMove(row, col, status, board) {
        const squares = board.querySelectorAll('.battleship-square');

        for (let i = 0; i < squares.length; i += 1) {
            if (
                Number(squares[i].dataset.row) === row
                && Number(squares[i].dataset.col) === col
            ) {
                squares[i].className = '';
                squares[i].classList.add('battleship-square');

                if (Number(status) === AttackStatus.hit) {
                    squares[i].classList.add('battleship-square--ship-hit');
                } else if (Number(status) === AttackStatus.sunk) {
                    squares[i].classList.add('battleship-square--ship-sunk');
                } else if (Number(status) === AttackStatus.miss) {
                    squares[i].classList.add('battleship-square--empty-hit');
                } break;
            }
        }
    }

    setPlayerMessage(status) {
        this.playerMessage.textContent = '';
        this.playerMessage.classList.remove('message');
        // eslint-disable-next-line no-unused-expressions
        this.playerMessage.offsetHeight;
        this.playerMessage.classList.add('message');

        const message1 = 'Your opponent ';
        let message2 = '';
        let message3 = '';

        if (status === AttackStatus.hit) {
            message2 = "<span class = 'hit-message>hit</span>";
            message3 = 'hit';
        } else if (status === AttackStatus.sunk) {
            message2 = "<span class = 'hit-message>sunk</span>";
            message3 = 'one of your ships';
        } else if (status === AttackStatus.miss) {
            message2 = "<span class = 'hit-message>missed!</span>";
            message3 = '';
        }
        this.playerMessage.innerHTML = `${message1}${message2}${message3}`;
    }

    setCpuMessage(status) {
        this.cpuMessage.textContent = '';
        this.cpuMessage.classList.remove('message');
        // eslint-disable-next-line no-unused-expressions
        this.cpuMessage.offsetHeight;
        this.cpuMessage.classList.add('message');

        const message1 = 'You ';
        let message2 = '';
        let message3 = '';

        if (status === AttackStatus.hit) {
            message2 = "<span class = 'hit-message>hit</span>";
            message3 = "the opponent's ship";
        } else if (status === AttackStatus.sunk) {
            message2 = "<span class = 'hit-message>sunk</span>";
            message3 = "one of the opponent's ship";
        } else if (status === AttackStatus.miss) {
            message2 = "<span class = 'hit-message>missed!</span>";
            message3 = '';
        }
        this.cpuMessage.innerHTML = `${message1}${message2}${message3}`;
    }

    dispayMessage(value) {
        if (value === '') {
            this.tempMessages.style.display = 'none';
        } else {
            this.tempMessages.style.display = 'block';
        }
        this.tempMessages.innerText = value;
    }

    highlightSquares(squaresToHighlight, valid) {
        if (squaresToHighlight !== undefined) {
            const squares = this.playerBoard.querySelectorAll('.battleship-square');
            for (let i = 0; i < squares.length; i += 1) {
                for (let j = 0; j < squaresToHighlight.length; j += 1) {
                    if (Number(squares[j].dataset.row) === squaresToHighlight[j].rowVar
                    && Number(squares[j].dataset.col) === squaresToHighlight[j].colVar) {
                        if (valid) {
                            squares[i].classList.add('battleship-square--place-highlight');
                        } else {
                            squares[i].classList.add('battleship-square--place-highlight-invalid');
                        }
                    }
                }
            }
        }
    }

    removeHighlightSquares() {
        const squares = this.playerBoard.querySelectorAll('.battleship-square');
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].classList.remove('battleship-square--place-highlight');
            squares[i].classList.remove('battleship-square--place-highlight-invalid');
        }
    }

    hideCpuBoard() {
        this.cpuField.classList.add('hidden');
    }

    showCpuBoard() {
        this.cpuField.classList.remove('hidden');
    }
}

export default ShipDom;
