const fs = require('fs');
const R = require('ramda');
const {
    getRoomDetails,
    isRoomReal,
    getLetterMap,
    getChecksum,
    sumRealRoomIds,
    decypherName,
    getNorthPoleStorageRoom,
} = require('./4');

const room1 = 'aaaaa-bbb-z-y-x-123[abxyz]';
const room2 = 'a-b-c-d-e-f-g-h-987[abcde]';
const room3 = 'not-a-real-room-404[oarel]';
const room4 = 'totally-real-room-200[decoy]';
const input = fs.readFileSync('./4.txt', 'utf-8');
const ex4 = fs.readFileSync('./4ex.txt', 'utf-8');

test('getLetterMap', () => {
    expect(getLetterMap('aadfa')).toEqual({a: 3, d: 1, f: 1});
})

test('getRoomDetails', () => {
    expect(getRoomDetails(room1)).toEqual({
        name: 'aaaaa-bbb-z-y-x',
        sectorId: 123,
        checksum: 'abxyz',
    });
});

test('getChecksum', () => {
    expect(getChecksum({h: 1, a: 3, f: 1})).toBe('afh');
})

test('isRoomReal', () => {
    const isStringRoomRealRoom = R.pipe(
        getRoomDetails,
        isRoomReal,
    );

    expect(isStringRoomRealRoom(room1)).toBe(true);
    expect(isStringRoomRealRoom(room2)).toBe(true);
    expect(isStringRoomRealRoom(room3)).toBe(true);
    expect(isStringRoomRealRoom(room4)).toBe(false);
});

test('sumRealRoomIds', () => {
    expect(sumRealRoomIds(ex4)).toBe(1514);
    expect(sumRealRoomIds(input)).toBe(245102);
});

test('decypherName', () => {
    expect(
        decypherName({name: 'qzmt-zixmtkozy-ivhz', sectorId: 343}).decypheredName
    ).toBe('very encrypted name');
});

test('logDecypheredNames', () => {
    expect(getNorthPoleStorageRoom(input)).toBe(324);
});