/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
class GameBoard {
    constructor(board) {
        this.board = board || [];
        if (!this.board.length) this.init();
    }

    init() {
        for (let i = 0; i < 100; i += 1) {
            this.board.push({ hasShip: false, isHit: false });
        }
    }

    receiveAttack(location) {
        this.board[location].isHit = true;
    }

    checkIfAttackHit(location) {
        // returns true for hit and false for miss
        return this.board[location].hasShip;
    }

    createLocationArray(location, ship, axis) {
        const locationArray = [];
        for (let i = 0; i < ship.length; i += 1) {
            (axis === 'x') ? (locationArray.push(location + i)) : (locationArray.push(location + i * 10));
        }
        return locationArray;
    }

    checkOverlap(locationArray) {
        const wallCollision = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        if (locationArray.some((loc) => !this.board[loc])) {
            return false;
        } if (locationArray.some((loc) => this.board[loc].hasShip)) {
            return false;
        // eslint-disable-next-line max-len
        } if (wallCollision.some((num) => [num, num + 1].every((combination) => locationArray.includes(combination)))
        ) {
            return false;
        }
        return true;
    }

    randomShipLocation(ship) {
        const randomAxis = () => ['x', 'y'][Math.floor(Math.random() * 2)];

        const findValidLocation = (axis) => {
            const possibleLocations = [];
            for (let i = 0; i < 100 - ship.length; i += 1) {
                const locationArray = [];
                if (axis === 'x') {
                    for (let count = 0; count < ship.length; i += 1) {
                        locationArray.push(i + count);
                    }
                } else {
                    for (let count = 0; count < ship.length; i += 1) {
                        locationArray.push(i + count * 10);
                    }
                }
                if (this.checkOverlap(locationArray)) {
                    possibleLocations.push(locationArray);
                }
            }
            return possibleLocations[Math.random() * possibleLocations.length];
        };
        return findValidLocation(randomAxis());
    }
}

export default GameBoard;
