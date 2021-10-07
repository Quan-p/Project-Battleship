/* eslint-disable class-methods-use-this */
import GameBoard from '../gameboard/gameboard';

class Player {
    constructor(name) {
        this.name = name;
        this.ships = [];
        this.gameboard = new GameBoard();
    }

    fireShot(location, gameboard) {
        if (gameboard.opponentBoard()[location] === 'empty') {
            gameboard.receiveShot(location);
        }
    }
}

export default Player;
