/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

import {
    BoardSize, BoardSpaceStatus, AttackStatus, Direction,
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
    // if empty space return true

    isSpaceEmpty(row, col) {
        if (this.boardState[row][col] === BoardSpaceStatus.empty) {
            return true;
        }
        return false;
    }

    //  if in bounds return true
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

        const coordsToCheck = GameBoard.getCoordsToCheck(ship, row, col, direction);

        for (let i = 0; i < coordsToCheck.length; i += 1) {
            if (!GameBoard.isSpaceInBounds(coordsToCheck[i].rowVar, coordsToCheck[i].colVar)) {
                return false;
            }
            if (!this.isSpaceEmpty(coordsToCheck[i].rowVar, coordsToCheck[i].colVar)) {
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
        if (!this.isValidPlacement(ship, row, col, direction)) {
            return false;
        }
        this.ships.push({
            ship, row, col, direction,
        });

        const coordsToCheck = GameBoard.getCoordsToCheck(ship, row, col, direction);
        for (let i = 0; i < coordsToCheck.length; i += 1) {
            this.boardState[coordsToCheck[i].rowVar][coordsToCheck[i].colVar] = BoardSpaceStatus.ship;
        }

        return true;
    }

    receiveAttack(row, col) {
        if (!GameBoard.isSpaceInBounds(row, col)) {
            return AttackStatus.invalid;
        }
        // invalid attacks
        if (
            this.boardState[row][col] === BoardSpaceStatus.emptyHit
            || this.boardState[row][col] === BoardSpaceStatus.shipHit
        ) {
            return AttackStatus.invalid;
        }
        if (this.boardState[row][col] === BoardSpaceStatus.empty) {
            this.boardState[row][col] = BoardSpaceStatus.emptyHit;
            return AttackStatus.miss;
        }
        if (this.boardState[row][col] === BoardSpaceStatus.ship) {
            this.boardState[row][col] = BoardSpaceStatus.shipHit;

            let hitStatus;
            for (let i = 0; i < this.ships.length; i += 1) {
                hitStatus = GameBoard.checkIfShotIsInShipBounds(row, col, this.ships[i]);

                if (hitStatus.hit) {
                    this.ships[i].ship.hit(hitStatus.position);
                    this.boardState[row][col] = BoardSpaceStatus.shipHit;
                    if (this.ships[i].ship.isSunk) {
                        this.boardState[row][col] = BoardSpaceStatus.shipSunk;
                        const coords = GameBoard.getShipCoords(this.ships[i]);
                        for (let j = 0; j < coords.length; j += 1) {
                            this.boardState[coords[j].row][coords[j].col] = BoardSpaceStatus.shipSunk;
                        }
                        return AttackStatus.sunk;
                    }
                    break;
                }
            }
            return AttackStatus.hit;
        }
        return AttackStatus.invalid;
    }

    static getShipCoords(ship) {
        const coords = [];
        let { row } = ship;
        let { col } = ship;
        coords.push({ row, col });

        for (let i = 0; i < ship.ship.length; i += 1) {
            switch (ship.direction) {
            case Direction.down: {
                row += 1;
                break;
            }
            case Direction.up: {
                row -= 1;
                break;
            }
            case Direction.right: {
                col += 1;
                break;
            }
            case Direction.left: {
                col -= 1;
                break;
            }
            default:
                break;
            }
            coords.push({ row, col });
        }
        return coords;
    }

    static checkIfShotIsInShipBounds(row, col, shipInfo) {
        let checkRow = shipInfo.row;
        let checkCol = shipInfo.col;

        switch (shipInfo.direction) {
        case Direction.right: {
            for (let i = 0; i < shipInfo.ship.length; i += 1) {
                if (checkRow === row && checkCol === col) {
                    return { hit: true, position: i };
                }
                checkCol += 1;
            }
            break;
        }
        case Direction.left: {
            for (let i = 0; i < shipInfo.ship.length; i += 1) {
                if (checkRow === row && checkCol === col) {
                    return { hit: true, position: i };
                }
                checkCol -= 1;
            }
            break;
        }
        case Direction.down: {
            for (let i = 0; i < shipInfo.ship.length; i += 1) {
                if (checkRow === row && checkCol === col) {
                    return { hit: true, position: i };
                }
                checkRow += 1;
            }
            break;
        }
        case Direction.up: {
            for (let i = 0; i < shipInfo.ship.length; i += 1) {
                if (checkRow === row && checkCol === col) {
                    return { hit: true, position: i };
                }
                checkRow -= 1;
            }
            break;
        }
        default: {
            break;
        }
        }
        return { hit: false, position: -1 };
    }

    checkAllShipsSunk() {
        let allShipsSunk = true;
        for (let i = 0; i < this.ships.length; i += 1) {
            if (!this.ships[i].ship.isSunk) {
                allShipsSunk = false;
            }
        }
        return allShipsSunk;
    }
}

export default GameBoard;
