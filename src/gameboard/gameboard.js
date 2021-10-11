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

    static isSpaceInBoard(row, col) {
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

    receiveAttack(location) {
        this.board[location].isHit = true;
    }
}

export default GameBoard;
