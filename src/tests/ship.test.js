import Ship from '../ship/ship';

let testSubmarine;
let testCarrier;

beforeEach(() => {
    testCarrier = new Ship(5);
    testSubmarine = new Ship(3);
});

test('accept hit', () => {
    testSubmarine.hit(0);
    expect(testSubmarine.hits).toEqual([0]);
});

test('accept multiple hits', () => {
    testSubmarine.hit(0);
    testSubmarine.hit(1);
    testSubmarine.hit(2);
    expect(testSubmarine.hits).toEqual([0, 1, 2]);
});

test('ship is shown as sunk', () => {
    testSubmarine.hit(12);
    testSubmarine.hit(13);
    testSubmarine.hit(14);
    expect(testSubmarine.isSunk()).toBe(true);
});
