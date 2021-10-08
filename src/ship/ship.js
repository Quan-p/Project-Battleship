class Ship {
    static hitStat = { unHit: 0, hit: 1};

    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.hits = [];
    }

    hit(index) {
        this.hits.push(index);
    }

    isSunk() {
        return this.position.every((occupiedCell) => this.hits.includes(occupiedCell));
    }
}

export default Ship;
