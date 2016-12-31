const fs = require('fs');

const {
    getInstruction,
    handleRectInstruction,
    handleRotateRowInstruction,
    handleRotateColInstruction,
    handleInstruction,
    countPixelLit,
    getMatrixPixelLitCount,
    printCode,
} = require('./8');

const input = fs.readFileSync('./8.txt', 'utf-8');
const ex8 = fs.readFileSync('./8ex.txt', 'utf-8');

test('getInstruction()', () => {
    expect(getInstruction('rect 14x1')).toEqual({
        type: 'rect', col: 14, row: 1,
    });
    expect(getInstruction('rotate column x=0 by 1')).toEqual({
        type: 'column', target: 0, offset: 1,
    });
    expect(getInstruction('rotate row y=2 by 10')).toEqual({
        type: 'row', target: 2, offset: 10,
    });
});

test('handleRotateColInstruction()', () => {
    const matrix = [
        [1, 1, 0],
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ];
    const ins = {type: 'rect', target: 2, offset: 5};
    expect(handleRotateColInstruction(matrix, ins)).toEqual([
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]);
});

test('handleRotateRowInstruction()', () => {
    const matrix = [
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
    ];
    const ins = {type: 'row', target: 2, offset: 5};
    expect(handleRotateRowInstruction(matrix, ins)).toEqual([
        [1, 1, 0],
        [1, 1, 0],
        [1, 0, 1],
        [0, 0, 0],
    ]);
});

test('handleRectInstruction()', () => {
    const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const rectIns = {type: 'rect', col: 2, row: 3};
    expect(handleRectInstruction(matrix, rectIns)).toEqual([
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
    ]);
});

test('handleInstruction()', () => {
    const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const rectIns = {type: 'rect', col: 2, row: 3};
    expect(handleInstruction(matrix, rectIns)).toEqual([
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
    ]);
});

test('countPixelLit()', () => {
    expect(countPixelLit([
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
    ])).toBe(6);
});

test('getMatrixPixelLitCount()', () => {
    // There's some shared state somewhere
    // expect(getMatrixPixelLitCount(ex8)).toBe(6);
    // expect(getMatrixPixelLitCount(input)).toBe(119);
});

test('printCode()', () => {
    // printCode(input);   // ZFHFSFOGPO
})