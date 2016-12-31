// @flow
const R = require('ramda');

type LCD = Array<Array<number>>;
const getMatrix: () => LCD = () => R
    .range(0, 6)
    .map(() => R.range(0, 50).map(() => 0));

type RectIns = {type: 'rect', col: number, row: number};
type RotateRowIns = {type: 'row', target: number, offset: number};
type RotateColIns = {type: 'column', target: number, offset: number};
type Ins =
    | RectIns
    | RotateRowIns
    | RotateColIns;

const getInstruction = (s: string): Ins => {
    const splitString = s.split(' ');
    if (splitString[0] === 'rect') {
        const [col, row] = splitString[1].split('x').map(Number);
        return {type: 'rect', col, row};
    }

    const type: 'column' | 'row' = (splitString[1]: any);   // force cast flow
    const details = {
        target: Number(splitString[2].split('=')[1]),
        offset: Number(splitString[4]),
    };

    if (type === 'column')
        return {type: 'column', ...details};
    else
        return {type: 'row', ...details};

};

const parseInput = R.pipe(
    R.split('\n'),
    R.map(getInstruction),
);

const handleRectInstruction = (matrix: LCD, {row, col}: RectIns): LCD => {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrix[i][j] = 1;
        }
    }
    return matrix;
};

const handleRotateRowInstruction = (matrix: LCD, {target, offset}: RotateRowIns): LCD => {
    const newRow = [];
    const prevRow = matrix[target];
    const rowLength = matrix[0].length
    for (let i = 0; i < rowLength; i++) {
       newRow[(i + offset) % rowLength] = prevRow[i];
    }
    matrix[target] = newRow;
    return matrix;
};

const handleRotateColInstruction = (matrix: LCD, {target, offset}: RotateColIns): LCD => {
    const newCol = []
    const colLength = matrix.length
    let i;
    for (i = 0; i < colLength; i++) {
        newCol[(i + offset) % colLength] = matrix[i][target];
    }
    for (i = 0; i < colLength; i++) {
        matrix[i][target] = newCol[i];
    }
    return matrix;
};

const handleInstruction = (matrix: LCD, ins: Ins): LCD => {
    if (ins.type === 'rect')
        return handleRectInstruction(matrix, ins);
    else if (ins.type === 'row')
        return handleRotateRowInstruction(matrix, ins);
    else
        return handleRotateColInstruction(matrix, ins);
};

const countPixelLit: (matrix: LCD) => number = R.reduce(
    (totalCount, row) => R.reduce(
        (rowCount, pixel) => rowCount + pixel,
        totalCount,
        row,
    ),
    0,
);

const getUpdatedMatrix = R.pipe(
    parseInput,
    R.reduce(
        handleInstruction,
        getMatrix(),
    ),
);

const getMatrixPixelLitCount = R.pipe(
    getUpdatedMatrix,
    countPixelLit,
);

const printCode = R.pipe(
    getUpdatedMatrix,

    R.map(line => line.reduce(
        (line: string, pixel: number, i: number) => (i % 5 === 0)
            ? `${line}|${String(pixel)}`
            : `${line}${String(pixel)}`,
        '',
    )),
    R.join('\n'),
    (stuff) => {
        console.log(stuff)
    }
)

module.exports = {
    getInstruction,
    handleRectInstruction,
    handleRotateRowInstruction,
    handleRotateColInstruction,
    handleInstruction,
    countPixelLit,
    getMatrixPixelLitCount,
    printCode,
};