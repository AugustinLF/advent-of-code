const R = require('ramda');

const padSize = 3;
const pad = R.range(0, padSize).map(
    lineValue => R.range(lineValue * padSize + 1, lineValue * padSize + padSize + 1)
);
const constrainMove = newVal =>
    newVal <=2 && newVal >= 0
        ? newVal
        : newVal > 2
            ? 2
            : 0;

const moveMap = {
    U: ({x, y}) => ({x, y: constrainMove(y - 1)}),
    D: ({x, y}) => ({x, y: constrainMove(y + 1)}),
    L: ({x, y}) => ({x: constrainMove(x - 1), y}),
    R: ({x, y}) => ({x: constrainMove(x + 1), y}),
}
const initialValue = {x: 1, y: 1};

const splitLines = R.split('\n');
const splitInstructions = R.split('');

const moveOnPad = (pos, nextMove) => moveMap[nextMove](pos);

const getBathroomCode = R.pipe(
    splitLines,
    R.map(splitInstructions),
    R.reduce(
        ({pos, code}, line) => {
            const nextPos = R.reduce(moveOnPad, pos, line);
            return {
                pos: nextPos,
                code: code + pad[nextPos.y][nextPos.x]
            };
        },
        {
            pos: initialValue,
            code: '',
        }
    ),
    R.prop('code'),
);

module.exports = {
    getBathroomCode,
};
