const input = 'L5, R1, L5, L1, R5, R1, R1, L4, L1, L3, R2, R4, L4, L1, L1, R2, R4, R3, L1, R4, L4, L5, L4, R4, L5, R1, R5, L2, R1, R3, L2, L4, L4, R1, L192, R5, R1, R4, L5, L4, R5, L1, L1, R48, R5, R5, L2, R4, R4, R1, R3, L1, L4, L5, R1, L4, L2, L5, R5, L2, R74, R4, L1, R188, R5, L4, L2, R5, R2, L4, R4, R3, R3, R2, R1, L3, L2, L5, L5, L2, L1, R1, R5, R4, L3, R5, L1, L3, R4, L1, L3, L2, R1, R3, R2, R5, L3, L1, L1, R5, L4, L5, R5, R2, L5, R2, L1, L5, L3, L5, L5, L1, R1, L4, L3, L1, R2, R5, L1, L3, R4, R5, L4, L1, R5, L1, R5, R5, R5, R2, R1, R2, L5, L5, L5, R4, L5, L4, L4, R5, L2, R1, R5, L1, L5, R4, L3, R4, L2, R3, R3, R3, L2, L2, L2, L1, L4, R3, L4, L2, R2, R5, L1, R2';
const ex1 = 'R2, L3';
const ex2 = 'R2, R2, R2';
const ex3 = 'R5, L5, R5, R3';
const ex4 = 'R8, R4, R4, R8';

const {
    computeDistanceFromInput,
    getFirstVisitedLocationDistance
} = require('./1');

test('1.1', () => {
  expect(computeDistanceFromInput(ex1)).toBe(5);
  expect(computeDistanceFromInput(ex2)).toBe(2);
  expect(computeDistanceFromInput(ex3)).toBe(12);
  expect(computeDistanceFromInput(input)).toBe(226);
});

test('1.2', () => {
    expect(getFirstVisitedLocationDistance(ex4)).toBe(4);
    expect(getFirstVisitedLocationDistance(input)).toBe(79);
})
