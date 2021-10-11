/* eslint-disable class-methods-use-this */

import {
    BoardSize, BoardSpaceStatus, AttackStatus, Direction 
} from '../ship/shipMessage';

/* eslint-disable no-unused-expressions */
class GameBoard {
    constructor() {
        this.boardState = [];
        this.ships = [];
        this.createBoard();
    }

    createBoard() {
        for (let i = 0; i < BoardSize; i += 1) {
            const newRow = [];
            for (let j = 0; j < BoardSize; j += 1) {
                newRow.push(BoardSpaceStatus.empty);
            }
            this.boardState.push(newRow);
        }
    }

    checkEmptyBoard(row, col) {
        if (this.boardState[row][col] === BoardSpaceStatus.empty) return true;
        return false;
    }

    static isSpaceInBounds(row, col) {
        if (
            row >= BoardSize
            || row < 0
            || col >= BoardSize
            || col < 0
        ) {
            return false;
        }
        return true;
    }

    resetBoard() {
        for (let i = 0; i < BoardSize; i += 1) {
            for (let j = 0; j < BoardSize; j += 1) {
                this.boardState[i][j] = BoardSpaceStatus.empty;
            }
        }
        while (this.ships.length > 0) {
            this.ships.pop();
        }
    }

    isValidPlacement(ship, row, col, direction) {
        if (!GameBoard.isSpaceInBounds(row, col)) {
            return false;
        }

        const checkCoords = GameBoard.getCoordsToCheck(ship, row, col, direction);

        for (let i = 0; i < checkCoords.length; i += 1) {
            if (!GameBoard.isSpaceInBounds(checkCoords[i].rowVar, checkCoords[i].colVar)) {
                return false;
            }
        }
        return true;
    }

    static getCoordsToCheck(ship, row, col, direction) {
        const coordsToCheck = [];
        let rowVar = row;
        let colVar = col;

        for (let i = 0; i < ship.length; i += 1) {
            coordsToCheck.push({ rowVar, colVar });

            switch (direction) {
            case Direction.right: {
                colVar += 1;
                break;
            }
            case Direction.left: {
                colVar -= 1;
                break;
            }
            case Direction.up: {
                rowVar -= 1;
                break;
            }
            case Direction.down: {
                rowVar += 1;
                break;
            }
            default: {
                break;
            }
            }
        }
        return coordsToCheck;
    }

    // return true if ship is in valid spot, false if not
    addShip(ship, row, col, direction) {
        if (!this.isValidPlacement) {
            return false;
        }
        // Adds ship if true
        this.ships.push({
            ship, row, col, direction,
        });

        const coordsToCheck = GameBoard.getCoordsToCheck(ship, row, col, direction);
        for (let i = 0; i < coordsToCheck.length; i += 1) {
            this.boardState[coordsToCheck[i].rowVar][coordsToCheck[i].colVar] = BoardSpaceStatus.ship;
        }

        return true;
    }

    receiveAttack(location) {
        this.board[location].isHit = true;
    }
}

export default GameBoard;
