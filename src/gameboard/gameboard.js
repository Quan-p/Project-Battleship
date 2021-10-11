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
            for (let x = 0; x < BoardSize; x += 1) {
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

    receiveAttack(location) {
        this.board[location].isHit = true;
    }
}

export default GameBoard;
