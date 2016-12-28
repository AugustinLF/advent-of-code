// @flow
const R = require('ramda');

type Room = {
    name: string,
    sectorId: number,
    checksum: string,
};
type DecypheredRoom = Room & {decypheredName: string};

type LetterMap = {[string]: number};
const getLetterMap = (arr: string, letterMap: LetterMap = {}): LetterMap => {
    if (arr.length === 0)
        return letterMap;

    // split + join because flow complains "rest of array pattern (Expected array instead of string)"
    const [letter, ...rest] = arr.split('');

    if (letter === '-')
        return getLetterMap(
            rest.join(''),
            letterMap,
        );

    return getLetterMap(
        rest.join(''),
        {
            ...letterMap,
            [letter]: letterMap[letter] ? letterMap[letter] + 1 : 1,
        },
    );
}
type LetterTuple = [string, number];
const getChecksum: LetterMap => string = R.pipe(
    R.toPairs,
    R.sort(
        (first: LetterTuple, second: LetterTuple) =>
            first[1] !== second[1]
                ? second[1] - first[1]
                : first[0].charCodeAt(0) - second[0].charCodeAt(0)
    ),
    R.map(R.view(R.lensIndex(0))),
    R.join(''),
    R.slice(0, 5),
);

const getRoomDetails = (s: string): Room => {
    const arr = s.split('-');

    // Perhaps I should learn regex
    const getSectorAndChecksum = R.pipe(
        R.last,
        R.split('['),
        R.over(R.lensIndex(1), R.dropLast(1)),
        R.over(R.lensIndex(0), Number),
    );
    const [sectorId, checksum] = getSectorAndChecksum(arr);
    return {
        name: R.pipe(R.dropLast(1), R.join('-'))(arr),
        sectorId,
        checksum,
    };
};

const isRoomReal = (room: Room): bool => room.checksum === getChecksum(getLetterMap(room.name));

const baseCode = 'a'.charCodeAt(0);
const getDecypheredName = sectorId => R.pipe(
    R.split(''),
    R.map((letter: string) =>
        letter === '-'
            ? ' '
            // work modulo 26, remove the initial offset by subtracting the code for a, then readd it
            : String.fromCharCode(((letter.charCodeAt(0) - baseCode) + sectorId) % 26 + baseCode),
    ),
    R.join(''),
)
const decypherName: Room => DecypheredRoom = (room: Room) => ({
    ...room,
    decypheredName: getDecypheredName(room.sectorId)(room.name),
});

const getRealRooms = R.pipe(
    R.trim,
    R.split('\n'),
    R.map(getRoomDetails),
    R.filter(isRoomReal),
);

const sumRealRoomIds = R.pipe(
    getRealRooms,
    R.map(R.prop('sectorId')),
    R.reduce((acc, id) => acc + id, 0),
);

const getNorthPoleStorageRoom = R.pipe(
    getRealRooms,
    R.map(decypherName),
    R.filter(R.where({decypheredName: R.contains('north')})),
    R.head,
    R.prop('sectorId'),
);

module.exports = {
    getRoomDetails,
    isRoomReal,
    getLetterMap,
    getChecksum,
    sumRealRoomIds,
    decypherName,
    getRealRooms,
    getNorthPoleStorageRoom,
}