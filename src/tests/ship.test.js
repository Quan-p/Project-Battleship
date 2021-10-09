import Ship from '../ship/ship';

let testSubmarine;
let testCarrier;

beforeEach(() => {
    testCarrier = new Ship(5);
    testSubmarine = new Ship(3);
});

test('accept hit', () => {
    testSubmarine.hit(3);
    expect(testSubmarine.hits).toEqual([0]);
});
