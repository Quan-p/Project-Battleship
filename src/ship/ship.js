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

    isSunk() {
        return this.position.every((occupiedCell) => this.hits.includes(occupiedCell));
    }
}

export default Ship;
