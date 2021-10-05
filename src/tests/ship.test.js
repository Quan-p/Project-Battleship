import Ship from '../ship/ship';

let testSubmarine;
let testCarrier;

beforeEach(() => {
    testCarrier = new Ship('carrier', [0, 1, 2, 3, 4]);
    testSubmarine = new Ship('submarine', [12, 13, 14]);
});

test('check name success', () => {
    expect(testSubmarine.name).toBe('submarine');
});

test('check position', () => {
    expect(testCarrier.position).toEqual([0, 1, 2, 3, 4]);
});

test('accept hit', () => {
    testSubmarine.hit(0);
    expect(testSubmarine.hits).toEqual([0]);
});

test('accept multiple hits', () => {
    testSubmarine.hit(5);
    testSubmarine.hit(6);
    testSubmarine.hit(7);
    expect(testSubmarine.hits).toEqual([5, 6, 7]);
});

test('ship is shown as sunk', () => {
    testSubmarine.hit(12);
    testSubmarine.hit(13);
    testSubmarine.hit(14);
    expect(testSubmarine.isSunk()).toBe(true);
});
