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

    receiveAttack(location) {
        this.board[location].isHit = true;
    }
}

export default GameBoard;
