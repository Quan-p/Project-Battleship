class Ship {
    static hitStatus = { unHit: 0, hit: 1};

    constructor(length) {
        this.status = new Array(length);
        for (let i = 0; i < length; i += 1) {
            this.status[i] = Ship.hitStatus.unHit;
        }
    }

    hit(index) {
        if (index < this.status.length) {
            this.status[index] = Ship.hitStatus.hit;
        }
    }

    get isSunk() {
        let sunk = true;
        for (let i = 0; i < this.status.length; i += 1) {
            if (this.status[i] === Ship.hitStatus.unHit) {
                sunk = false;
            }
        }
        return sunk;
    }

    get shipLength() {
        return this.status.length;
    }
}

export default Ship;
