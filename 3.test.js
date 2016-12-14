const fs = require('fs');
const {countPossibleTriangles, countPossibleVerticalTriangles} = require('./3');

const ex1 = '5 10 25';
const ex2 = '5 10 11';
const input = fs.readFileSync('./3.txt', 'utf-8');
const ex3 = fs.readFileSync('./3ex.txt', 'utf-8');

test('3.1', () => {
    expect(countPossibleTriangles(ex1)).toBe(0);
    expect(countPossibleTriangles(ex2)).toBe(1);
    expect(countPossibleTriangles(input)).toBe(1050);
});

test('3.2', () => {
    expect(countPossibleVerticalTriangles(ex3)).toBe(6);
    expect(countPossibleVerticalTriangles(input)).toBe(1921);
});
