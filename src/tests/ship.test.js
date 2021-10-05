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
    expect(testSubmarine.hits).toEqual([5]);
});
