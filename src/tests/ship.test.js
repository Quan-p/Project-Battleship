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
