const R = require('ramda');

const squaredConstraints = {
    pad: [
        [-1, -1, -1, -1, -1],
        [-1, 1, 2, 3, -1],
        [-1, 4, 5, 6, -1],
        [-1, 7, 8, 9, -1],
        [-1, -1, -1, -1, -1],
    ],
    initialValue: {x: 2, y: 2},
};
const diamondConstraints = {
    pad: [
        [-1, -1, 1, -1, -1],
        [-1, 2, 3, 4, -1],
        [5, 6, 7, 8, 9],
        [-1, 'A', 'B', 'C', -1],
        [-1, -1, 'D', -1, -1],
    ],
    initialValue: {x: 0, y: 2},
};

const getPos = pad => pos => pad[pos.y][pos.x]
const constrainMove = (val, nextVal) =>
    nextVal !== -1
        ? nextVal
        : val;

const moveMap = {
    U: ({x, y}) => ({x, y: y - 1}),
    D: ({x, y}) => ({x, y: y + 1}),
    L: ({x, y}) => ({x: x - 1, y}),
    R: ({x, y}) => ({x: x + 1, y}),
};

const splitLines = R.split('\n');
const splitInstructions = R.split('');

const moveOnPad = getPosOnPad => (pos, nextMove) => {
    const nextPos = moveMap[nextMove](pos);
    const isNextPosOutOfPad = nextPos.x < 0 || nextPos.x > 4 || nextPos.y < 0 || nextPos.y > 4;

    return !isNextPosOutOfPad && getPosOnPad(nextPos) !== -1
        ? nextPos
        : pos;
};

const computePad = ({pad, initialValue}) => R.reduce(
    ({pos, code}, line) => {
        const getPosOnPad = getPos(pad);
        const nextPos = R.reduce(moveOnPad(getPosOnPad), pos, line);
        return {
            pos: nextPos,
            code: code + getPosOnPad(nextPos)
        };
    },
    {
        pos: initialValue,
        code: '',
    }
)

const getCode = (constraints) => R.pipe(
    splitLines,
    R.map(splitInstructions),
    computePad(constraints),
    R.prop('code'),
)

const getBathroomCode = getCode(squaredConstraints);

const getWeirdBathroomCode = getCode(diamondConstraints);

module.exports = {
    getBathroomCode,
    getWeirdBathroomCode,
};
