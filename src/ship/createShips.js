import newElement from '../createElement';
import {
    GameMessages, BoardSpaceStatus, AttackStatus, BoardSize, Direction,
} from './shipMessage';

class ShipDom {
    constructor(domFleet) {
        this.domFleet = domFleet;
        this.sendMessage = null;
        this.resetGame = this.resetGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.sendRotate = this.sendRotate.bind(this);
        this.selectShipToPlace = this.selectShipToPlace.bind(this);
        this.body = document.querySelector('body');

        this.createElementsForShipPlacement();
        this.createGameElements();
        this.createElementsForStartPage();
    }

    createElementsForStartPage() {
        this.introParent = newElement.createElement('div', 'intro-wrapper');
        this.introTitle = newElement.createElement('h1', 'intro-title');
        this.introMessage = newElement.createElement('p', 'intro-message');
        this.introButton = newElement.createElement('button', 'intro-button');

        this.introTitle.innerText = 'BATTLESHIP';
        this.introMessage.innerText = "Place the 5 ships of your fleet on the board.  Be the first to sink all 5 of your opponent's ships to win!";
        this.introButton.innerText = 'START GAME';

        this.introButton.addEventListener('click', this.startGame);
        this.introParent.appendChild(this.introTitle);
        this.introParent.appendChild(this.introMessage);
        this.introParent.appendChild(this.introButton);
        this.body.textContent = '';
        this.body.appendChild(this.introParent);
    }

    createElementsForShipPlacement() {
        this.placementPreviewSpace = newElement.createElement('div', 'placement-preview-space');

        this.rotateButton = newElement.createElement('button', 'rotate-button');
        this.rotateButton.innerText = 'ROTATE';
        this.rotateButton.addEventListener('click', this.sendRotate);

        this.testGrid = newElement.createElement('div', 'test-grid');
        for (let i = 0; i < 25; i += 1) {
            this.testGrid.appendChild(newElement.createElement('div', 'testGrid-empty'));
        }
        this.testShip = newElement.createElement('div', 'test-ship');
        this.fleetWrapper = newElement.createElement('div', 'fleet-wrapper');
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

    highlightFleetButton(index) {
        for (let i = 0; i < this.fleetWrapper.childNodes.length; i += 1) {
            if (Number(this.fleetWrapper.childNodes[i].dataset.index) === index) {
                this.fleetWrapper.childNodes[i].classList.add('fleet-button-highlight');
            } else {
                this.fleetWrapper.childNodes[i].classList.remove('fleet-button-highlight');
            }
        }
    }

    addFleetButtons() {
        for (let i = 0; i < this.domFleet.length; i += 1) {
            const btn = newElement.createElement('button', 'fleet-wrapper-button');
            btn.style.gridColumn = `1 / span ${this.domFleet[i].length}`;
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
        this.title = newElement.createElement('div', 'game-title');
        this.titleContent = newElement.createElement('h1', 'game-title-content');
        this.titleContent.innerText = 'BATTLESHIP';
        this.title.appendChild(this.titleContent);

        this.playingField = newElement.createElement('div', 'playing-field');
        this.playerField = newElement.createElement('div', 'player-field');
        this.cpuField = newElement.createElement('div', 'player-field');
        this.playerTitle = newElement.createElement('h2', 'player-title');
        this.playerTitle = newElement.createElement('h2', 'player-title');
        this.cpuTitle = newElement.createElement('h2', 'player-title');
        this.playerTitle.innerText = 'YOUR WATERS';
        this.cpuTitle.innerText = 'CPU WATERS';

        this.playerBoard = newElement.createElement('div', 'player-field-grid');
        this.cpuBoard = newElement.createElement('div', 'player-field-grid');

        this.playerMessage = newElement.createElement('div', 'player-field-message');
        this.cpuMessage = newElement.createElement('div', 'player-field-message');
        this.playerMessage.innerText = ' ';
        this.cpuMessage.innerText = ' ';

        this.stageInfo = newElement.createElement('div', 'stage-info');
        this.tempMessages = newElement.createElement('h3', 'stage-temp-messages');
        this.tempMessages.innerText = ' ';
        this.stageInfo.appendChild(this.tempMessages);

        this.playerField.appendChild(this.playerTitle);
        this.playerField.appendChild(this.playerBoard);
        this.playerField.appendChild(this.playerMessage);

        this.cpuField.appendChild(this.cpuTitle);
        this.cpuField.appendChild(this.cpuBoard);
        this.cpuField.appendChild(this.cpuMessage);

        this.resetField = newElement.createElement('div', 'reset-field');
        this.resetButton = newElement.createElement('button', 'reset-field-button');
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
        this.body.appendChild(this.playingField);
        this.body.appendChild(this.resetField);

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

    setHoverEventHandler(callback) {
        this.playerBoard.addEventListener('mouseover', callback);
    }

    setMouseLeaveEventHandler(callback) {
        this.playerBoard.addEventListener('mouseleave', callback);
    }

    setRightClickEventHandler(callback) {
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
                const square = newElement.createElement('div', ['battleship-square--empty', 'battleship-square']);
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
                const square = newElement.createElement('div');
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
                default:
                    break;
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
            this.sendMessage(GameMessages.DrawCpuBoard);
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
            message2 = "<span class='hit-message'>hit</span>";
            message3 = ' one of your ships.';
        } else if (status === AttackStatus.sunk) {
            message2 = "<span class='sunk-message'>sunk</span>";
            message3 = ' one of your ships';
        } else if (status === AttackStatus.miss) {
            message2 = "<span class = 'miss-message'>missed!</span>";
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
            message2 = "<span class = 'hit-message'>hit</span>";
            message3 = " the opponent's ship";
        } else if (status === AttackStatus.sunk) {
            message2 = "<span class = 'sunk-message'>sunk</span>";
            message3 = " one of the opponent's ship";
        } else if (status === AttackStatus.miss) {
            message2 = "<span class = 'miss-message'>missed!</span>";
            message3 = '';
        }
        this.cpuMessage.innerHTML = `${message1}${message2}${message3}`;
    }

    displayMessage(value) {
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
                    if (
                        Number(squares[i].dataset.row) === squaresToHighlight[j].rowVar
                        && Number(squares[i].dataset.col) === squaresToHighlight[j].colVar
                    ) {
                    // highlight
                        if (valid) {
                            squares[i].classList.add('battleship-square--place-highlight');
                        } else {
                            squares[i].classList.add(
                                'battleship-square--place-highlight-invalid',
                            );
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

    startGame() {
        this.sendMessage(GameMessages.StartGame);
    }

    smallPlayerBoard() {
        this.playerBoard.classList.add('player-field-grid--mini');
    }

    normalPlayerBoard() {
        this.playerBoard.classList.remove('player-field-grid--mini');
    }

    rotateTestShip(length, direction) {
        let colStart = 1;
        let rowStart = 1;
        // possible issue here in future
        switch (length) {
        case 2: {
            colStart = 3;
            rowStart = 3;
            break;
        }
        case 3: {
            if (direction === Direction.left || direction === Direction.right) {
                colStart = 2;
                rowStart = 3;
            } else {
                colStart = 3;
                rowStart = 2;
            }
            break;
        }
        case 4:
        case 5: {
            if (direction === Direction.left || direction === Direction.right) {
                colStart = 1;
                rowStart = 3;
            } else {
                colStart = 3;
                rowStart = 1;
            }
            break;
        }
        default: {
            break;
        }
        }

        if (direction === Direction.left || direction === Direction.right) {
            this.testShip.style.gridColumn = `${colStart} / span ${length}`;
            this.testShip.style.gridRow = `${rowStart}`;
        } else {
            this.testShip.style.gridRow = `${rowStart} / span ${length}`;
            this.testShip.style.gridColumn = `${colStart}`;
        }
    }

    sendRotate() {
        this.sendMessage(GameMessages.Rotate);
    }

    hidePlacementOptions() {
        this.placementPreviewSpace.style.display = 'none';
    }

    showPlacementOptions() {
        this.placementPreviewSpace.style.display = 'flex';
    }
}

export default ShipDom;
