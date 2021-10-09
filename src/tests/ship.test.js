import Ship from '../ship/ship';

let testSubmarine;
let testCarrier;

beforeEach(() => {
    testCarrier = new Ship(5);
    testSubmarine = new Ship(3);
});

test('ships with no hit return false sunk status', () => {
    expect(testSubmarine.isSunk).toEqual(false);
});

test('partially hit ship returns false sunk status', () => {
    testSubmarine.hit(1);
    expect(testSubmarine.isSunk).toEqual(false);
});

test('fully hit ship returns true sunk status', () => {
    testSubmarine.hit(0);
    testSubmarine.hit(1);
    testSubmarine.hit(2);

    expect(testSubmarine.isSunk).toEqual(true);
});
